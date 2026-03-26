import { Heart, Users, BookOpen, HandHeart, Briefcase, GraduationCap, Scale, Package, School, UserCheck, Home, Activity } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Link } from 'react-router';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';

export function ProgramsPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-r from-[#2C5F2D] to-[#4A8B4D] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Programs & Initiatives</h1>
          <p className="text-xl text-gray-100 max-w-3xl mx-auto">
            Comprehensive support systems designed to create lasting, transformative change in the lives of those we serve
          </p>
        </div>
      </section>

      {/* Programs Tabs */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="widows" className="w-full">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-12 h-auto">
              <TabsTrigger value="widows" className="py-4">
                <Heart className="w-5 h-5 mr-2" />
                <span className="hidden sm:inline">Widow Empowerment</span>
                <span className="sm:hidden">Widows</span>
              </TabsTrigger>
              <TabsTrigger
                value="orphans"
                disabled
                className="py-4 opacity-60 cursor-not-allowed"
              >
                <Users className="w-5 h-5 mr-2" />
                <span className="hidden sm:inline">Orphan Care</span>
                <span className="sm:hidden">Orphans</span>
              </TabsTrigger>
              <TabsTrigger
                value="reverts"
                disabled
                className="py-4 opacity-60 cursor-not-allowed"
              >
                <BookOpen className="w-5 h-5 mr-2" />
                <span className="hidden sm:inline">Revert Support</span>
                <span className="sm:hidden">Reverts</span>
              </TabsTrigger>
              <TabsTrigger
                value="emergency"
                disabled
                className="py-4 opacity-60 cursor-not-allowed"
              >
                <HandHeart className="w-5 h-5 mr-2" />
                <span className="hidden sm:inline">Emergency Relief</span>
                <span className="sm:hidden">Relief</span>
              </TabsTrigger>
            </TabsList>

            {/* Widow Empowerment */}
            <TabsContent value="widows">
              <div className="space-y-12">
                <div className="text-center max-w-3xl mx-auto">
                  <div className="w-20 h-20 bg-gradient-to-br from-[#C9A961] to-[#8B7355] rounded-full flex items-center justify-center mx-auto mb-6">
                    <Heart className="w-10 h-10 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-[#2C5F2D] mb-4">Widow Empowerment Programs</h2>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    Supporting widows to rebuild their lives with dignity through financial assistance, skills development, 
                    and comprehensive support systems that foster independence and resilience.
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <Card className="border-2 border-[#C9A961]/30 hover:border-[#C9A961] transition-colors">
                    <CardContent className="p-6">
                      <Package className="w-10 h-10 text-[#C9A961] mb-4" />
                      <h3 className="text-xl font-semibold text-[#2C5F2D] mb-3">Monthly Financial Support</h3>
                      <p className="text-gray-600 leading-relaxed">
                        Regular financial assistance to cover basic needs including food, shelter, healthcare, and children's education. 
                        Support is provided with dignity and respect.
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="border-2 border-[#C9A961]/30 hover:border-[#C9A961] transition-colors">
                    <CardContent className="p-6">
                      <Briefcase className="w-10 h-10 text-[#C9A961] mb-4" />
                      <h3 className="text-xl font-semibold text-[#2C5F2D] mb-3">Skills Development</h3>
                      <p className="text-gray-600 leading-relaxed">
                        Vocational training programs in tailoring, cooking, handicrafts, computer skills, and small business 
                        management to enable financial independence.
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="border-2 border-[#C9A961]/30 hover:border-[#C9A961] transition-colors">
                    <CardContent className="p-6">
                      <Scale className="w-10 h-10 text-[#C9A961] mb-4" />
                      <h3 className="text-xl font-semibold text-[#2C5F2D] mb-3">Legal Aid</h3>
                      <p className="text-gray-600 leading-relaxed">
                        Legal assistance for inheritance rights, property disputes, and custody matters—ensuring widows 
                        receive their rightful entitlements under Islamic law.
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <Card className="bg-gradient-to-br from-[#FAF8F3] to-[#F5F1E8] border-2 border-[#C9A961]/30">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold text-[#2C5F2D] mb-4">Success Story</h3>
                    <p className="text-gray-700 italic leading-relaxed mb-4">
                      "When my husband passed away, I had three young children and no income. TFF not only provided monthly 
                      support but also enrolled me in their tailoring program. Today, I run my own small tailoring business 
                      from home, earning enough to support my family. The program gave me more than money—it gave me confidence 
                      and hope for the future."
                    </p>
                    <p className="text-[#C9A961] font-semibold">— Fatima, Widow & Small Business Owner, Pakistan</p>
                  </CardContent>
                </Card>

                <div className="text-center">
                  <Button
                    size="lg"
                    type="button"
                    disabled
                    className="bg-[#C9A961] text-white opacity-70 cursor-not-allowed"
                    aria-disabled="true"
                  >
                    Sponsor a Widow
                  </Button>
                </div>
              </div>
            </TabsContent>

            {/* Orphan Care */}
            <TabsContent value="orphans">
              <div className="space-y-12">
                <div className="text-center max-w-3xl mx-auto">
                  <div className="w-20 h-20 bg-gradient-to-br from-[#C9A961] to-[#8B7355] rounded-full flex items-center justify-center mx-auto mb-6">
                    <Users className="w-10 h-10 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-[#2C5F2D] mb-4">Orphan Care & Education</h2>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    Providing comprehensive care, education, and mentorship to orphaned children, ensuring they have the 
                    foundation for a bright and successful future.
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <Card className="border-2 border-[#C9A961]/30 hover:border-[#C9A961] transition-colors">
                    <CardContent className="p-6">
                      <GraduationCap className="w-10 h-10 text-[#C9A961] mb-4" />
                      <h3 className="text-xl font-semibold text-[#2C5F2D] mb-3">Education Sponsorship</h3>
                      <p className="text-gray-600 leading-relaxed">
                        Full sponsorship covering tuition fees, school supplies, uniforms, and educational materials from 
                        primary through higher education.
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="border-2 border-[#C9A961]/30 hover:border-[#C9A961] transition-colors">
                    <CardContent className="p-6">
                      <School className="w-10 h-10 text-[#C9A961] mb-4" />
                      <h3 className="text-xl font-semibold text-[#2C5F2D] mb-3">School Kits & Uniforms</h3>
                      <p className="text-gray-600 leading-relaxed">
                        Annual provision of complete school kits with books, stationery, bags, and uniforms ensuring children 
                        can attend school with dignity.
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="border-2 border-[#C9A961]/30 hover:border-[#C9A961] transition-colors">
                    <CardContent className="p-6">
                      <UserCheck className="w-10 h-10 text-[#C9A961] mb-4" />
                      <h3 className="text-xl font-semibold text-[#2C5F2D] mb-3">Mentorship Programs</h3>
                      <p className="text-gray-600 leading-relaxed">
                        Pairing orphans with caring mentors who provide guidance, emotional support, and positive role 
                        models throughout their development.
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <Card className="bg-gradient-to-br from-[#FAF8F3] to-[#F5F1E8] border-2 border-[#C9A961]/30">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold text-[#2C5F2D] mb-4">Impact Story</h3>
                    <p className="text-gray-700 italic leading-relaxed mb-4">
                      "I lost both my parents in a car accident when I was 8 years old. TFF sponsored my education from 
                      grade 3 through university. I just graduated with a degree in engineering and have secured a job at 
                      a leading firm. The education they provided changed the trajectory of my entire life. Now I want to 
                      give back and help other orphans like me."
                    </p>
                    <p className="text-[#C9A961] font-semibold">— Omar, Engineering Graduate & Former Sponsored Orphan, Egypt</p>
                  </CardContent>
                </Card>

                <div className="text-center">
                  <Link to="/donate">
                    <Button size="lg" className="bg-[#C9A961] hover:bg-[#B89751] text-white">
                      Sponsor an Orphan
                    </Button>
                  </Link>
                </div>
              </div>
            </TabsContent>

            {/* Revert Support */}
            <TabsContent value="reverts">
              <div className="space-y-12">
                <div className="text-center max-w-3xl mx-auto">
                  <div className="w-20 h-20 bg-gradient-to-br from-[#C9A961] to-[#8B7355] rounded-full flex items-center justify-center mx-auto mb-6">
                    <BookOpen className="w-10 h-10 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-[#2C5F2D] mb-4">Revert Support & Integration</h2>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    Comprehensive support for new Muslims, providing education, community integration, and spiritual guidance 
                    to help them thrive in their faith journey.
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <Card className="border-2 border-[#C9A961]/30 hover:border-[#C9A961] transition-colors">
                    <CardContent className="p-6">
                      <BookOpen className="w-10 h-10 text-[#C9A961] mb-4" />
                      <h3 className="text-xl font-semibold text-[#2C5F2D] mb-3">Islamic Education</h3>
                      <p className="text-gray-600 leading-relaxed">
                        Structured 15-module training program covering foundations of faith, daily practice, lifestyle 
                        guidance, and long-term spiritual development.
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="border-2 border-[#C9A961]/30 hover:border-[#C9A961] transition-colors">
                    <CardContent className="p-6">
                      <UserCheck className="w-10 h-10 text-[#C9A961] mb-4" />
                      <h3 className="text-xl font-semibold text-[#2C5F2D] mb-3">Personal Mentorship</h3>
                      <p className="text-gray-600 leading-relaxed">
                        One-on-one mentorship with experienced Muslims who provide guidance, answer questions, and offer 
                        emotional support during the transition.
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="border-2 border-[#C9A961]/30 hover:border-[#C9A961] transition-colors">
                    <CardContent className="p-6">
                      <Home className="w-10 h-10 text-[#C9A961] mb-4" />
                      <h3 className="text-xl font-semibold text-[#2C5F2D] mb-3">Community Integration</h3>
                      <p className="text-gray-600 leading-relaxed">
                        Connections to local mosques, Islamic centers, and supportive communities ensuring new Muslims 
                        feel welcomed and included.
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <Card className="bg-gradient-to-br from-[#FAF8F3] to-[#F5F1E8] border-2 border-[#C9A961]/30">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold text-[#2C5F2D] mb-4">Transformation Story</h3>
                    <p className="text-gray-700 italic leading-relaxed mb-4">
                      "When I accepted Islam, I felt lost and overwhelmed. TFF's training program was a lifeline—it taught 
                      me everything from how to pray to understanding Islamic values. My mentor Sarah became like a sister 
                      to me, always there when I had questions or felt lonely. Now, one year later, I'm confident in my faith 
                      and have a beautiful Muslim community around me. I'm even mentoring new reverts myself!"
                    </p>
                    <p className="text-[#C9A961] font-semibold">— Jennifer (Aminah), New Muslim, USA</p>
                  </CardContent>
                </Card>

                <div className="text-center">
                  <Link to="/training">
                    <Button size="lg" className="bg-[#C9A961] hover:bg-[#B89751] text-white">
                      Explore Training Modules
                    </Button>
                  </Link>
                </div>
              </div>
            </TabsContent>

            {/* Emergency Relief */}
            <TabsContent value="emergency">
              <div className="space-y-12">
                <div className="text-center max-w-3xl mx-auto">
                  <div className="w-20 h-20 bg-gradient-to-br from-[#C9A961] to-[#8B7355] rounded-full flex items-center justify-center mx-auto mb-6">
                    <HandHeart className="w-10 h-10 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-[#2C5F2D] mb-4">Emergency & Relief Programs</h2>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    Rapid response to crises and emergencies, providing immediate assistance to communities affected by 
                    natural disasters, conflicts, and humanitarian emergencies.
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <Card className="border-2 border-[#C9A961]/30 hover:border-[#C9A961] transition-colors">
                    <CardContent className="p-6">
                      <Package className="w-10 h-10 text-[#C9A961] mb-4" />
                      <h3 className="text-xl font-semibold text-[#2C5F2D] mb-3">Food Distribution</h3>
                      <p className="text-gray-600 leading-relaxed">
                        Emergency food packages, hot meals, and nutritional support for families affected by crises, 
                        ensuring no one goes hungry.
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="border-2 border-[#C9A961]/30 hover:border-[#C9A961] transition-colors">
                    <CardContent className="p-6">
                      <Activity className="w-10 h-10 text-[#C9A961] mb-4" />
                      <h3 className="text-xl font-semibold text-[#2C5F2D] mb-3">Medical Aid</h3>
                      <p className="text-gray-600 leading-relaxed">
                        Mobile medical clinics, emergency healthcare services, medicines, and medical supplies for 
                        communities in crisis situations.
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="border-2 border-[#C9A961]/30 hover:border-[#C9A961] transition-colors">
                    <CardContent className="p-6">
                      <HandHeart className="w-10 h-10 text-[#C9A961] mb-4" />
                      <h3 className="text-xl font-semibold text-[#2C5F2D] mb-3">Crisis Response</h3>
                      <p className="text-gray-600 leading-relaxed">
                        24/7 emergency hotline, rapid deployment teams, and coordinated relief efforts in response to 
                        natural disasters and humanitarian crises.
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <Card className="bg-gradient-to-br from-[#FAF8F3] to-[#F5F1E8] border-2 border-[#C9A961]/30">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold text-[#2C5F2D] mb-4">Recent Response</h3>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      <strong>Syria Earthquake Relief (2023):</strong> Within 48 hours of the devastating earthquake, 
                      TFF deployed emergency teams providing food, medical care, and temporary shelter to over 10,000 
                      affected families. Our continued presence ensures long-term recovery and rebuilding support.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      <strong>Bangladesh Flood Response (2024):</strong> Distributed emergency food packages to 5,000 
                      families, established medical camps treating 3,000+ patients, and provided clean water solutions 
                      to prevent waterborne diseases.
                    </p>
                  </CardContent>
                </Card>

                <div className="text-center">
                  <Link to="/donate">
                    <Button size="lg" className="bg-[#C9A961] hover:bg-[#B89751] text-white">
                      Support Emergency Relief
                    </Button>
                  </Link>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Long-Term Development */}
      <section className="py-20 bg-gradient-to-br from-[#FAF8F3] to-[#F5F1E8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C5F2D] mb-4">Long-Term Development Projects</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Creating sustainable solutions for poverty alleviation and community empowerment
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-2 border-[#C9A961]/30">
              <CardContent className="p-8">
                <Briefcase className="w-12 h-12 text-[#C9A961] mb-4" />
                <h3 className="text-2xl font-semibold text-[#2C5F2D] mb-4">Sustainable Livelihoods</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  We invest in programs that create long-term economic opportunities including:
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-[#C9A961] mr-2">•</span>
                    Micro-enterprise development and small business loans
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#C9A961] mr-2">•</span>
                    Agricultural training and farming cooperatives
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#C9A961] mr-2">•</span>
                    Vocational skills centers for marketable trades
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#C9A961] mr-2">•</span>
                    Women's economic empowerment initiatives
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card className="border-2 border-[#C9A961]/30">
              <CardContent className="p-8">
                <School className="w-12 h-12 text-[#C9A961] mb-4" />
                <h3 className="text-2xl font-semibold text-[#2C5F2D] mb-4">Community Development</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Building strong, self-sufficient communities through:
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-[#C9A961] mr-2">•</span>
                    Islamic education centers and community libraries
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#C9A961] mr-2">•</span>
                    Water wells and clean water infrastructure
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#C9A961] mr-2">•</span>
                    Healthcare clinics in underserved areas
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#C9A961] mr-2">•</span>
                    Youth leadership and community engagement programs
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
