import assert from 'node:assert/strict'
import { before, test } from 'node:test'
import sharp from 'sharp'
import { NextRequest } from 'next/server'
import { db, setupSynthetic, actors, cookies } from './fixture'
import { MAX_PHOTO_BYTES, uploadProfilePhoto } from '../../lib/profile-photo'
import { PATCH } from '../../app/api/fellows/me/route'
before(setupSynthetic)
const origin='https://timesheets.example.org'
const png=()=>sharp({create:{width:8,height:8,channels:3,background:'#ffffff'}}).png().toBuffer()
const photo=async()=>new File([await png()],'../../private-original.png',{type:'image/png'})
test('photo upload fails clearly without configuration and never calls storage',async()=>{
  let called=false
  await assert.rejects(()=>uploadProfilePhoto(actors.fellow, new File(['x'],'x.png',{type:'image/png'}),{configured:()=>false,upload:async()=>{called=true;throw Error('must not run')}}),/temporarily unavailable/)
  assert.equal(called,false)
})
test('photo rejects oversized, active, corrupt and mismatched images before any storage write',async()=>{
  const deps={configured:()=>true,upload:async()=>{throw Error('must not run')}}
  for(const file of [new File([new Uint8Array(MAX_PHOTO_BYTES+1)],'large.png',{type:'image/png'}),new File(['<svg/>'],'x.svg',{type:'image/svg+xml'}),new File(['bad'],'x.png',{type:'image/png'}),new File([await png()],'x.jpg',{type:'image/jpeg'})])
    await assert.rejects(()=>uploadProfilePhoto(actors.fellow,file,deps),e=>(e as {status?:number}).status===400)
})
test('photo is decoded, reencoded and stored under authenticated actor with no client filename',async()=>{
  let writes=0
  const result=await uploadProfilePhoto(actors.fellow,await photo(),{configured:()=>true,upload:async(path,bytes,options)=>{
    writes++;assert.ok(path.startsWith(`fellows/${actors.fellow}/`));assert.doesNotMatch(path,/private-original|\.\./)
    assert.equal(options.access,'public');assert.equal(options.contentType,'image/webp')
    const metadata=await sharp(bytes as Buffer).metadata();assert.equal(metadata.format,'webp');assert.equal(metadata.exif,undefined)
    return {url:'https://synthetic.public.blob.vercel-storage.com/photo.webp'} as Awaited<ReturnType<typeof import('@vercel/blob').put>>
  }})
  assert.equal(writes,1);assert.match(result,/photo.webp$/)
})
test('photo storage failure is sanitized',async()=>{
  await assert.rejects(()=>uploadProfilePhoto(actors.fellow,new File(['bad'],'x.png',{type:'image/png'}),{configured:()=>false,upload:async()=>{throw Error('secret provider detail')}}),e=>!String(e).includes('secret provider'))
  const file=await photo()
  await assert.rejects(()=>uploadProfilePhoto(actors.fellow,file,{configured:()=>true,upload:async()=>{throw Error('secret provider detail')}}),e=>(e as {status?:number}).status===503&&!String(e).includes('secret provider'))
})
function req(body:BodyInit,cookie='',requestOrigin=origin,type?:string){return new NextRequest(origin+'/api/fellows/me',{method:'PATCH',headers:{origin:requestOrigin,cookie,...(type?{'content-type':type}:{})},body})}
test('profile route rejects unsigned and cross-site requests; client identity and photo URL cannot override actor',async()=>{
  const cookie='fellow_session='+cookies.get(actors.fellow)
  assert.equal((await PATCH(req('{}','','https://evil.example','application/json'))).status,401)
  assert.equal((await PATCH(req('{}',cookie,'https://evil.example','application/json'))).status,403)
  const response=await PATCH(req(JSON.stringify({id:actors.pm,bio:'Own new bio',photo_url:'https://evil.example/photo',status:'alumni'}),cookie,origin,'application/json'))
  assert.equal(response.status,200)
  const rows=(await db.query('SELECT id,bio,photo_url,status FROM fellows WHERE id IN ($1,$2)',[actors.fellow,actors.pm])).rows as any[]
  assert.equal(rows.find(r=>r.id===actors.fellow).bio,'Own new bio');assert.equal(rows.find(r=>r.id===actors.fellow).photo_url,null)
  assert.equal(rows.find(r=>r.id===actors.pm).bio,null);assert.equal(rows.find(r=>r.id===actors.fellow).status,'current')
})
test('missing Blob configuration preserves profile instead of partially saving',async()=>{
  delete process.env.BLOB_READ_WRITE_TOKEN
  const form=new FormData();form.set('bio','Must not save');form.set('photo',await photo())
  const result=await PATCH(req(form,'fellow_session='+cookies.get(actors.fellow)))
  assert.equal(result.status,503);assert.doesNotMatch(await result.text(),/BLOB_READ_WRITE_TOKEN/)
  assert.notEqual((await db.query<{bio:string}>('SELECT bio FROM fellows WHERE id=$1',[actors.fellow])).rows[0].bio,'Must not save')
})
