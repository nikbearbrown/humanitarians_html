import type { Metadata } from "next"
import Link from "next/link"
import PrimaryButton from "@/components/ui/primary-button"
import SecondaryButton from "@/components/ui/secondary-button"

export const metadata: Metadata = {
  title: "Mentors Guidelines - Humanitarians AI",
  description: "Comprehensive guidelines for mentors working with OPT Fellows at Humanitarians AI, a 501(c)(3) nonprofit organization",
}

export default function MentorPage() {
  return (
    <div className="container px-4 md:px-6 mx-auto py-12">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Mentors Guidelines</h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Guidelines for mentors working with OPT Fellows at Humanitarians AI. As a 501(c)(3) nonprofit, we provide valuable practical training opportunities for international students while advancing our mission of using AI for social good.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid gap-12">
          {/* Introduction */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Introduction</h2>
            <div className="prose prose-lg dark:prose-invert">
              <p>
                This document outlines the responsibilities of mentors working with Humanitarians AI fellows who are on Optional Practical Training (OPT). As a 501(c)(3) nonprofit, Humanitarians AI provides valuable practical training opportunities for international students while advancing our mission of using AI for social good.
              </p>
              <p>
                Mentors at Humanitarians AI serve primarily as educators and guides, focusing on the fellow's technical and professional development. Humanitarians AI handles the administrative aspects of the OPT process, including formal documentation and verification.
              </p>
            </div>
          </section>

          {/* Understanding OPT Requirements */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Understanding OPT Requirements</h2>
            <div className="prose prose-lg dark:prose-invert mb-6">
              <p>OPT fellows face specific regulatory requirements that mentors must understand:</p>
            </div>
            
            <div className="grid gap-4">
              <div className="p-6 border rounded-lg">
                <h3 className="text-lg font-bold mb-3">Employment Relationship</h3>
                <p className="text-sm">OPT fellows must maintain employment directly related to their field of study</p>
              </div>
              <div className="p-6 border rounded-lg">
                <h3 className="text-lg font-bold mb-3">Minimum Hours</h3>
                <p className="text-sm">Fellows must work at least 20 hours per week to maintain legal F-1 OPT status</p>
              </div>
              <div className="p-6 border rounded-lg">
                <h3 className="text-lg font-bold mb-3">Unemployment Limitations</h3>
                <p className="text-sm">Fellows cannot accrue more than 90 days of unemployment during their OPT period</p>
              </div>
              <div className="p-6 border rounded-lg">
                <h3 className="text-lg font-bold mb-3">Documentation</h3>
                <p className="text-sm">Proper documentation of the employment relationship is essential</p>
              </div>
            </div>
          </section>

          {/* Mentor Responsibilities */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Mentor Responsibilities</h2>
            
            <div className="space-y-8">
              {/* Project Alignment & Educational Focus */}
              <div className="p-6 border rounded-lg">
                <h3 className="text-xl font-bold mb-4">1. Project Alignment & Educational Focus</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Ensure Field Relevance</h4>
                    <p className="text-sm text-muted-foreground">Design projects that clearly relate to the fellow's academic field of study</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Monitor Documentation</h4>
                    <ul className="text-sm space-y-1 ml-4">
                      <li>• Regularly review the fellow's documentation on GitHub as described at: <Link href="https://github.com/Humanitariansai/Fellows" className="text-primary hover:underline">GitHub Fellows Directory</Link></li>
                      <li>• Promptly inform Humanitarians AI if a fellow is not properly documenting their work</li>
                      <li>• Ensure fellows understand the importance of documentation for OPT compliance</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Documentation Support</h4>
                    <ul className="text-sm space-y-1 ml-4">
                      <li>• Assist fellows with technical documentation of their work</li>
                      <li>• Help fellows articulate how their work relates to their academic field</li>
                      <li>• Guide fellows in documenting educational/training components of their experience</li>
                    </ul>
                    <p className="text-sm text-muted-foreground mt-2">
                      <strong>Note:</strong> Humanitarians AI will handle formal employment documentation and offer letters, especially for mentors who do not have an e-verify US business or organization.
                    </p>
                  </div>
                </div>
              </div>

              {/* Structured Supervision */}
              <div className="p-6 border rounded-lg">
                <h3 className="text-xl font-bold mb-4">2. Structured Supervision</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Regular Check-ins</h4>
                    <p className="text-sm text-muted-foreground mb-2">Conduct weekly or bi-weekly meetings to:</p>
                    <ul className="text-sm space-y-1 ml-4">
                      <li>• Review progress on assigned projects</li>
                      <li>• Provide technical guidance and feedback</li>
                      <li>• Address challenges and adjust project scope as needed</li>
                      <li>• Document attendance and participation</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Clear Expectations</h4>
                    <p className="text-sm text-muted-foreground">Set clear deliverables and deadlines</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Work Verification</h4>
                    <p className="text-sm text-muted-foreground">Track and verify that fellows maintain the minimum 20 hours per week requirement</p>
                  </div>
                </div>
              </div>

              {/* Educational Development */}
              <div className="p-6 border rounded-lg">
                <h3 className="text-xl font-bold mb-4">3. Educational Development</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Training Plan</h4>
                    <p className="text-sm text-muted-foreground mb-2">Develop a structured training plan outlining:</p>
                    <ul className="text-sm space-y-1 ml-4">
                      <li>• Skills to be developed</li>
                      <li>• Learning objectives</li>
                      <li>• Progression of responsibilities</li>
                      <li>• Evaluation criteria</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Additional Focus Areas</h4>
                    <ul className="text-sm space-y-1 ml-4">
                      <li>• <strong>Skill Development:</strong> Focus on building technical and professional skills relevant to the fellow's field</li>
                      <li>• <strong>Knowledge Transfer:</strong> Share expertise and guide research/implementation methodology</li>
                      <li>• <strong>Industry Exposure:</strong> Connect fellows with relevant professionals and resources</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Documentation Oversight and Recommendation Letters */}
              <div className="p-6 border rounded-lg">
                <h3 className="text-xl font-bold mb-4">4. Documentation Oversight and Recommendation Letters</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Monitor Activity Documentation</h4>
                    <p className="text-sm text-muted-foreground mb-2">Ensure fellows maintain detailed logs of:</p>
                    <ul className="text-sm space-y-1 ml-4">
                      <li>• Hours worked (minimum 20 per week)</li>
                      <li>• Tasks completed</li>
                      <li>• Skills developed</li>
                      <li>• Technologies utilized</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">GitHub Documentation</h4>
                    <ul className="text-sm space-y-1 ml-4">
                      <li>• Regularly verify fellows maintain proper GitHub documentation according to guidelines</li>
                      <li>• Ensure bi-weekly updates are being submitted</li>
                      <li>• Review code contributions and project documentation</li>
                      <li>• Alert Humanitarians AI if documentation requirements are not being met</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Recommendation Letters</h4>
                    <p className="text-sm text-muted-foreground mb-2">As the primary technical mentor, you will be the one fellows approach for recommendation letters. These should include:</p>
                    <ul className="text-sm space-y-1 ml-4">
                      <li>• Detailed description of the fellow's technical contributions</li>
                      <li>• Assessment of skills developed and demonstrated</li>
                      <li>• Evaluation of work quality and impact</li>
                      <li>• Confirmation of project relevance to academic field</li>
                      <li>• Professional growth observations</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Supporting OPT Compliance */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Supporting OPT Compliance</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 border rounded-lg">
                <h3 className="text-lg font-bold mb-3">Role Clarification</h3>
                <ul className="text-sm space-y-1">
                  <li>• <strong>Mentor Focus:</strong> Primary role is educational and technical guidance</li>
                  <li>• <strong>Administrative Support:</strong> Humanitarians AI handles formal employment verification and documentation</li>
                  <li>• <strong>Collaboration:</strong> Work with Humanitarians AI to ensure fellows meet all requirements</li>
                </ul>
              </div>
              
              <div className="p-6 border rounded-lg">
                <h3 className="text-lg font-bold mb-3">Documentation Oversight</h3>
                <ul className="text-sm space-y-1">
                  <li>• <strong>GitHub Monitoring:</strong> Regularly review fellows' GitHub documentation</li>
                  <li>• <strong>Documentation Guidance:</strong> Help fellows understand technical documentation requirements</li>
                  <li>• <strong>Hours Verification:</strong> Ensure fellows meet 20-hour minimum requirement</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Best Practices for OPT Mentorship */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Best Practices for OPT Mentorship</h2>
            
            <div className="grid gap-6">
              <div className="p-6 border rounded-lg">
                <h3 className="text-lg font-bold mb-3">Understand Each Fellow's Background</h3>
                <ul className="text-sm space-y-1">
                  <li>• Review academic transcripts or CV</li>
                  <li>• Discuss coursework relevant to projects</li>
                  <li>• Identify knowledge gaps to address</li>
                </ul>
              </div>
              
              <div className="p-6 border rounded-lg">
                <h3 className="text-lg font-bold mb-3">Create Individualized Development Plans</h3>
                <ul className="text-sm space-y-1">
                  <li>• Set learning objectives aligned with academic background</li>
                  <li>• Establish progression of increasing responsibility</li>
                  <li>• Identify specific skills to develop</li>
                </ul>
              </div>
              
              <div className="p-6 border rounded-lg">
                <h3 className="text-lg font-bold mb-3">Balance Guidance and Autonomy</h3>
                <ul className="text-sm space-y-1">
                  <li>• Provide clear direction while encouraging independent problem-solving</li>
                  <li>• Gradually increase project ownership</li>
                  <li>• Foster innovation while ensuring practical training objectives are met</li>
                </ul>
              </div>
              
              <div className="p-6 border rounded-lg">
                <h3 className="text-lg font-bold mb-3">Facilitate Professional Development</h3>
                <ul className="text-sm space-y-1">
                  <li>• Encourage conference participation or paper submissions</li>
                  <li>• Create opportunities for presentation and communication skills</li>
                  <li>• Provide feedback on professional growth</li>
                </ul>
              </div>
              
              <div className="p-6 border rounded-lg">
                <h3 className="text-lg font-bold mb-3">Maintain Clear Communication</h3>
                <ul className="text-sm space-y-1">
                  <li>• Set explicit expectations about deliverables and timelines</li>
                  <li>• Provide regular, constructive feedback</li>
                  <li>• Document all significant communications</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Legal Considerations */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Legal Considerations for Unpaid Positions</h2>
            <div className="prose prose-lg dark:prose-invert mb-6">
              <p>For unpaid positions, mentors must ensure the following to comply with Department of Labor regulations:</p>
            </div>
            
            <div className="grid gap-4">
              <div className="p-4 border-l-4 border-primary bg-muted rounded-lg">
                <p className="text-sm font-medium">Educational Focus: The experience must be primarily for the benefit of the fellow</p>
              </div>
              <div className="p-4 border-l-4 border-primary bg-muted rounded-lg">
                <p className="text-sm font-medium">Professional Environment: Training must be similar to that given in an educational environment</p>
              </div>
              <div className="p-4 border-l-4 border-primary bg-muted rounded-lg">
                <p className="text-sm font-medium">Business Operations: Regular operations should not be dependent on the fellow's work</p>
              </div>
              <div className="p-4 border-l-4 border-primary bg-muted rounded-lg">
                <p className="text-sm font-medium">Displacement: Fellows should not displace regular employees</p>
              </div>
              <div className="p-4 border-l-4 border-primary bg-muted rounded-lg">
                <p className="text-sm font-medium">Educational Benefit: The mentor provides significant educational benefits through close supervision</p>
              </div>
              <div className="p-4 border-l-4 border-primary bg-muted rounded-lg">
                <p className="text-sm font-medium">Expectations: No guarantee of employment following the training period</p>
              </div>
            </div>
          </section>

          {/* Responsibilities Breakdown */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Mentor & Humanitarians AI Responsibilities</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 border rounded-lg">
                <h3 className="text-lg font-bold mb-4">Mentor Responsibilities</h3>
                <ul className="text-sm space-y-2">
                  <li>• Provide technical guidance and educational support</li>
                  <li>• Monitor GitHub documentation compliance</li>
                  <li>• Write recommendation letters when requested</li>
                  <li>• Alert Humanitarians AI about documentation issues</li>
                  <li>• Focus on the fellow's educational and professional development</li>
                </ul>
              </div>
              
              <div className="p-6 border rounded-lg">
                <h3 className="text-lg font-bold mb-4">Humanitarians AI Responsibilities</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium mb-1">Prepare formal documentation describing:</p>
                    <ul className="text-xs space-y-1 ml-4">
                      <li>• The fellow's role and responsibilities</li>
                      <li>• How the work directly relates to their academic field</li>
                      <li>• The educational/training components of the experience</li>
                      <li>• Weekly hour commitments (minimum 20 hours)</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-1">Provide formal offer letters specifying:</p>
                    <ul className="text-xs space-y-1 ml-4">
                      <li>• Start and end dates</li>
                      <li>• Project description and educational benefits</li>
                      <li>• Weekly hour commitment</li>
                      <li>• Volunteer/unpaid status (if applicable)</li>
                      <li>• Humanitarians AI's 501(c)(3) status</li>
                    </ul>
                  </div>
                  <ul className="text-sm space-y-1">
                    <li>• Handle employment verification for immigration purposes</li>
                    <li>• Maintain official records for compliance purposes</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Conclusion */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Conclusion</h2>
            <div className="prose prose-lg dark:prose-invert">
              <p>
                Effective mentorship of OPT fellows requires a commitment to providing valuable practical training while ensuring compliance with regulatory requirements. By following these guidelines and working in collaboration with Humanitarians AI, mentors help fellows maintain legal status while gaining valuable skills and contributing to the organization's mission.
              </p>
              <p className="text-sm text-muted-foreground mt-4">
                This document was created to guide mentors at Humanitarians AI. For specific legal advice regarding OPT regulations, please consult with qualified immigration counsel.
              </p>
            </div>
          </section>

          {/* Call to Action */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Ready to Become a Mentor?</h2>
            <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
              <PrimaryButton href="mailto:hr@humanitarians.ai?subject=Mentor Application">
                Apply to Become a Mentor
              </PrimaryButton>
              <SecondaryButton href="/contact">
                Contact Us
              </SecondaryButton>
              <PrimaryButton href="https://github.com/Humanitariansai/Fellows">
                View Fellows GitHub
              </PrimaryButton>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
