import { Heart, Users, BookOpen, HandHeart, DollarSign, CreditCard, Building, Shield, PieChart, CheckCircle } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { useState } from 'react';

export function DonatePage() {
  const [selectedAmount, setSelectedAmount] = useState('100');
  const [customAmount, setCustomAmount] = useState('');
  const [donationType, setDonationType] = useState('one-time');

  const donationOptions = [
    {
      icon: Heart,
      title: 'Widow Support',
      description: 'Sponsor a widow for one month',
      amount: '$50',
      impact: 'Provides monthly financial support and dignity to a widow in need',
    },
    {
      icon: Users,
      title: 'Orphan Education',
      description: 'Sponsor an orphan for one month',
      amount: '$75',
      impact: 'Covers education, school supplies, and mentorship for one child',
    },
    {
      icon: BookOpen,
      title: 'New Muslim Support',
      description: 'Support a new Muslim for one month',
      amount: '$40',
      impact: 'Provides training materials, mentorship, and community integration',
    },
    {
      icon: HandHeart,
      title: 'Emergency Relief',
      description: 'Support emergency relief efforts',
      amount: '$100',
      impact: 'Provides food, medical aid, and emergency assistance to families in crisis',
    },
  ];

  const quickAmounts = ['25', '50', '100', '250', '500', '1000'];

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-r from-[#2C5F2D] to-[#4A8B4D] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Make a Difference Today</h1>
          <p className="text-xl text-gray-100 max-w-3xl mx-auto mb-8">
            Your generous donation transforms lives and brings hope to widows, orphans, and new Muslims worldwide
          </p>
          <div className="flex items-center justify-center gap-8 text-sm">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              <span>Secure Payment</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              <span>100% Transparent</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5" />
              <span>Tax Deductible</span>
            </div>
          </div>
        </div>
      </section>

      {/* Donation Form */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Donation Form */}
            <div className="lg:col-span-2">
              <Card className="border-2 border-[#C9A961]/30">
                <CardContent className="p-8">
                  <Tabs value={donationType} onValueChange={setDonationType} className="mb-8">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="one-time">One-Time Donation</TabsTrigger>
                      <TabsTrigger value="monthly">Monthly Giving</TabsTrigger>
                    </TabsList>
                  </Tabs>

                  <div className="space-y-6">
                    {/* Select Program */}
                    <div>
                      <Label className="text-lg font-semibold text-[#2C5F2D] mb-4 block">
                        Choose a Program to Support
                      </Label>
                      <RadioGroup defaultValue="general" className="space-y-3">
                        <div className="flex items-center space-x-3 border-2 border-gray-200 rounded-lg p-4 hover:border-[#C9A961] cursor-pointer">
                          <RadioGroupItem value="general" id="general" />
                          <Label htmlFor="general" className="flex-1 cursor-pointer">
                            <div className="font-semibold text-[#2C5F2D]">Where Needed Most</div>
                            <div className="text-sm text-gray-600">Allow us to direct funds to areas of greatest need</div>
                          </Label>
                        </div>
                        <div className="flex items-center space-x-3 border-2 border-gray-200 rounded-lg p-4 hover:border-[#C9A961] cursor-pointer">
                          <RadioGroupItem value="widows" id="widows" />
                          <Label htmlFor="widows" className="flex-1 cursor-pointer">
                            <div className="font-semibold text-[#2C5F2D]">Widow Empowerment</div>
                            <div className="text-sm text-gray-600">Support widows with financial aid and skills training</div>
                          </Label>
                        </div>
                        <div className="flex items-center space-x-3 border-2 border-gray-200 rounded-lg p-4 hover:border-[#C9A961] cursor-pointer">
                          <RadioGroupItem value="orphans" id="orphans" />
                          <Label htmlFor="orphans" className="flex-1 cursor-pointer">
                            <div className="font-semibold text-[#2C5F2D]">Orphan Care & Education</div>
                            <div className="text-sm text-gray-600">Sponsor orphans' education and comprehensive care</div>
                          </Label>
                        </div>
                        <div className="flex items-center space-x-3 border-2 border-gray-200 rounded-lg p-4 hover:border-[#C9A961] cursor-pointer">
                          <RadioGroupItem value="reverts" id="reverts" />
                          <Label htmlFor="reverts" className="flex-1 cursor-pointer">
                            <div className="font-semibold text-[#2C5F2D]">New Muslim Support</div>
                            <div className="text-sm text-gray-600">Help new Muslims with training and integration</div>
                          </Label>
                        </div>
                        <div className="flex items-center space-x-3 border-2 border-gray-200 rounded-lg p-4 hover:border-[#C9A961] cursor-pointer">
                          <RadioGroupItem value="emergency" id="emergency" />
                          <Label htmlFor="emergency" className="flex-1 cursor-pointer">
                            <div className="font-semibold text-[#2C5F2D]">Emergency Relief</div>
                            <div className="text-sm text-gray-600">Provide immediate aid to crisis situations</div>
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    {/* Select Amount */}
                    <div>
                      <Label className="text-lg font-semibold text-[#2C5F2D] mb-4 block">
                        Select Amount
                      </Label>
                      <div className="grid grid-cols-3 gap-3 mb-4">
                        {quickAmounts.map((amount) => (
                          <button
                            key={amount}
                            onClick={() => {
                              setSelectedAmount(amount);
                              setCustomAmount('');
                            }}
                            className={`py-4 px-6 rounded-lg border-2 font-semibold transition-all ${
                              selectedAmount === amount && !customAmount
                                ? 'bg-[#C9A961] text-white border-[#C9A961]'
                                : 'border-gray-200 text-gray-700 hover:border-[#C9A961]'
                            }`}
                          >
                            ${amount}
                          </button>
                        ))}
                      </div>
                      <div>
                        <Label htmlFor="custom-amount" className="mb-2 block">
                          Or enter custom amount
                        </Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input
                            id="custom-amount"
                            type="number"
                            placeholder="Enter amount"
                            className="pl-10"
                            value={customAmount}
                            onChange={(e) => {
                              setCustomAmount(e.target.value);
                              setSelectedAmount('');
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Payment Method */}
                    <div>
                      <Label className="text-lg font-semibold text-[#2C5F2D] mb-4 block">
                        Payment Method
                      </Label>
                      <div className="space-y-3">
                        <div className="border-2 border-gray-200 rounded-lg p-4 hover:border-[#C9A961]">
                          <div className="flex items-center gap-3 mb-3">
                            <CreditCard className="w-5 h-5 text-[#C9A961]" />
                            <span className="font-semibold">Credit/Debit Card</span>
                          </div>
                          <div className="space-y-3">
                            <div>
                              <Label htmlFor="card-number">Card Number</Label>
                              <Input id="card-number" placeholder="1234 5678 9012 3456" />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <Label htmlFor="expiry">Expiry Date</Label>
                                <Input id="expiry" placeholder="MM/YY" />
                              </div>
                              <div>
                                <Label htmlFor="cvv">CVV</Label>
                                <Input id="cvv" placeholder="123" />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="border-2 border-gray-200 rounded-lg p-4 hover:border-[#C9A961] cursor-pointer">
                          <div className="flex items-center gap-3">
                            <Building className="w-5 h-5 text-[#C9A961]" />
                            <span className="font-semibold">Bank Transfer</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Personal Information */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="first-name">First Name</Label>
                        <Input id="first-name" placeholder="John" />
                      </div>
                      <div>
                        <Label htmlFor="last-name">Last Name</Label>
                        <Input id="last-name" placeholder="Doe" />
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" type="email" placeholder="john@example.com" />
                      </div>
                    </div>

                    {/* Submit */}
                    <Button size="lg" className="w-full bg-[#C9A961] hover:bg-[#B89751] text-white py-6 text-lg">
                      <Heart className="w-5 h-5 mr-2" />
                      Complete Donation: ${customAmount || selectedAmount}
                      {donationType === 'monthly' && '/month'}
                    </Button>

                    <p className="text-sm text-gray-600 text-center">
                      By completing this donation, you agree to our terms and privacy policy. 
                      All donations are tax-deductible (Tax ID: 12-3456789)
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Donation Options */}
              <Card className="border-2 border-[#C9A961]/30">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-[#2C5F2D] mb-4">Quick Donation Options</h3>
                  <div className="space-y-3">
                    {donationOptions.map((option, index) => (
                      <div key={index} className="border-l-4 border-[#C9A961] bg-[#FAF8F3] p-4 rounded-r-lg">
                        <div className="flex items-start gap-3">
                          <option.icon className="w-6 h-6 text-[#C9A961] flex-shrink-0 mt-1" />
                          <div className="flex-1">
                            <div className="font-semibold text-[#2C5F2D] mb-1">{option.title}</div>
                            <div className="text-sm text-gray-600 mb-2">{option.impact}</div>
                            <div className="text-lg font-bold text-[#C9A961]">{option.amount}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Impact Calculator */}
              <Card className="bg-gradient-to-br from-[#2C5F2D] to-[#4A8B4D] text-white border-0">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Your Impact</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-[#C9A961]" />
                      <span>100% of your donation goes to programs</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-[#C9A961]" />
                      <span>Administrative costs covered by other funding</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-[#C9A961]" />
                      <span>Quarterly impact reports sent to all donors</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-[#C9A961]" />
                      <span>Tax-deductible receipt issued immediately</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Transparency Commitment */}
      <section className="py-20 bg-gradient-to-br from-[#FAF8F3] to-[#F5F1E8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#2C5F2D] mb-4">Our Transparency Commitment</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We believe in complete transparency about how your donations are used
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center border-2 border-[#C9A961]/30">
              <CardContent className="p-8">
                <div className="w-20 h-20 bg-gradient-to-br from-[#C9A961] to-[#8B7355] rounded-full flex items-center justify-center mx-auto mb-4">
                  <PieChart className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-[#C9A961] mb-2">95%</h3>
                <p className="text-sm text-gray-600">
                  Transparency rating from independent auditors
                </p>
              </CardContent>
            </Card>
            <Card className="text-center border-2 border-[#C9A961]/30">
              <CardContent className="p-8">
                <div className="w-20 h-20 bg-gradient-to-br from-[#C9A961] to-[#8B7355] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-[#C9A961] mb-2">Annual Audits</h3>
                <p className="text-sm text-gray-600">
                  Complete financial audits by certified independent firms
                </p>
              </CardContent>
            </Card>
            <Card className="text-center border-2 border-[#C9A961]/30">
              <CardContent className="p-8">
                <div className="w-20 h-20 bg-gradient-to-br from-[#C9A961] to-[#8B7355] rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-[#C9A961] mb-2">Real Results</h3>
                <p className="text-sm text-gray-600">
                  Detailed impact reports showing exactly how funds are used
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Breakdown Chart */}
          <Card className="mt-12 border-2 border-[#C9A961]/30">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-[#2C5F2D] mb-6 text-center">
                How Your Donation is Used
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold text-[#2C5F2D]">Direct Program Services</span>
                    <span className="text-[#C9A961] font-bold">85%</span>
                  </div>
                  <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-[#C9A961] rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold text-[#2C5F2D]">Program Development & Training</span>
                    <span className="text-[#C9A961] font-bold">10%</span>
                  </div>
                  <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-[#8B7355] rounded-full" style={{ width: '10%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold text-[#2C5F2D]">Administrative & Operations</span>
                    <span className="text-[#C9A961] font-bold">5%</span>
                  </div>
                  <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-[#2C5F2D] rounded-full" style={{ width: '5%' }}></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
