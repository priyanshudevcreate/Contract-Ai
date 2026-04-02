import React, { useState } from 'react';
import { X, FileText, Download, Copy, Zap, Calendar, User, Building, DollarSign, Clock, ArrowRight, ArrowLeft } from 'lucide-react';

interface TemplateGeneratorModalProps {
    isOpen: boolean;
    onClose: () => void;
    template: {
        id: number;
        name: string;
        category: string;
        description?: string;
    } | null;
}

interface FormData {
    // Common fields
    partyOneName: string;
    partyOneAddress: string;
    partyTwoName: string;
    partyTwoAddress: string;
    effectiveDate: string;

    // NDA specific
    confidentialityPeriod?: string;

    // Employment specific
    position?: string;
    salary?: string;
    startDate?: string;
    benefits?: string;

    // Freelance specific
    projectDescription?: string;
    deliverables?: string;
    paymentTerms?: string;
    deadline?: string;

    // Service Agreement specific
    serviceDescription?: string;
    serviceFee?: string;
    paymentSchedule?: string;
    terminationNotice?: string;
}

export default function TemplateGeneratorModal({ isOpen, onClose, template }: TemplateGeneratorModalProps) {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState<FormData>({
        partyOneName: '',
        partyOneAddress: '',
        partyTwoName: '',
        partyTwoAddress: '',
        effectiveDate: new Date().toISOString().split('T')[0],
    });
    const [generatedContract, setGeneratedContract] = useState<string>('');
    const [isGenerating, setIsGenerating] = useState(false);

    if (!isOpen || !template) return null;

    const handleInputChange = (field: keyof FormData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    // Contract generation functions
    const generateNDAContract = (data: FormData): string => {
        return `NON-DISCLOSURE AGREEMENT

This Non-Disclosure Agreement ("Agreement") is entered into on ${data.effectiveDate} between:

DISCLOSING PARTY: ${data.partyOneName}
Address: ${data.partyOneAddress}

RECEIVING PARTY: ${data.partyTwoName}
Address: ${data.partyTwoAddress}

RECITALS

WHEREAS, the Disclosing Party possesses certain confidential and proprietary information;
WHEREAS, the Receiving Party desires to receive such confidential information for evaluation purposes;

NOW, THEREFORE, in consideration of the mutual covenants contained herein, the parties agree:

1. CONFIDENTIAL INFORMATION
The term "Confidential Information" shall mean all non-public, proprietary information disclosed by the Disclosing Party, including but not limited to:
- Technical data, trade secrets, know-how, research, product plans
- Business information, customer lists, financial information
- Any other information marked as confidential or that would reasonably be considered confidential

2. OBLIGATIONS OF RECEIVING PARTY
The Receiving Party agrees to:
a) Hold all Confidential Information in strict confidence
b) Use the Confidential Information solely for evaluation purposes
c) Not disclose Confidential Information to any third party without prior written consent
d) Protect the Confidential Information with the same degree of care used for its own confidential information

3. TERM AND TERMINATION
This Agreement shall remain in effect for ${data.confidentialityPeriod || '2 years'} from the date of execution.
Upon termination, all Confidential Information must be returned or destroyed.

4. EXCEPTIONS
This Agreement does not apply to information that:
- Is publicly available through no breach of this Agreement
- Was known to Receiving Party prior to disclosure
- Is independently developed without use of Confidential Information

5. REMEDIES
The Receiving Party acknowledges that breach of this Agreement may cause irreparable harm, and the Disclosing Party shall be entitled to seek equitable relief, including injunction and specific performance.

6. GOVERNING LAW
This Agreement shall be governed by the laws of [Jurisdiction].

IN WITNESS WHEREOF, the parties have executed this Agreement as of the date first written above.

DISCLOSING PARTY:                    RECEIVING PARTY:

_____________________               _____________________
${data.partyOneName}                ${data.partyTwoName}
Date: _______________               Date: _______________`;
    };

    const generateEmploymentContract = (data: FormData): string => {
        return `EMPLOYMENT AGREEMENT

This Employment Agreement ("Agreement") is entered into on ${data.effectiveDate} between:

EMPLOYER: ${data.partyOneName}
Address: ${data.partyOneAddress}

EMPLOYEE: ${data.partyTwoName}
Address: ${data.partyTwoAddress}

1. EMPLOYMENT
Employer hereby employs Employee in the position of ${data.position || '[Position Title]'}, and Employee accepts such employment, subject to the terms and conditions set forth herein.

2. DUTIES AND RESPONSIBILITIES
Employee shall perform such duties and responsibilities as are customarily associated with the position, including but not limited to those duties assigned by Employer from time to time.

3. TERM OF EMPLOYMENT
Employment shall commence on ${data.startDate || data.effectiveDate} and shall continue until terminated in accordance with this Agreement.

4. COMPENSATION
a) Base Salary: Employee shall receive an annual salary of ${data.salary || '[Annual Salary]'}, payable in accordance with Employer's standard payroll practices.
b) Benefits: Employee shall be entitled to participate in benefit programs available to similarly situated employees.

5. BENEFITS AND LEAVE
Employee shall be entitled to:
${data.benefits || '- Health insurance coverage\n- Paid time off in accordance with company policy\n- Retirement plan participation\n- Other benefits as determined by Employer'}

6. CONFIDENTIALITY
Employee acknowledges that during employment, Employee may have access to confidential information. Employee agrees to maintain the confidentiality of such information during and after employment.

7. TERMINATION
This Agreement may be terminated:
a) By either party with thirty (30) days written notice
b) By Employer immediately for cause
c) By mutual agreement of the parties

8. POST-EMPLOYMENT OBLIGATIONS
Employee's obligations regarding confidentiality and non-solicitation shall survive termination of employment.

9. GOVERNING LAW
This Agreement shall be governed by applicable employment laws.

IN WITNESS WHEREOF, the parties have executed this Agreement as of the date first written above.

EMPLOYER:                           EMPLOYEE:

_____________________              _____________________
${data.partyOneName}               ${data.partyTwoName}
Date: _______________              Date: _______________`;
    };

    const generateFreelanceContract = (data: FormData): string => {
        return `FREELANCE SERVICE AGREEMENT

This Freelance Service Agreement ("Agreement") is entered into on ${data.effectiveDate} between:

CLIENT: ${data.partyOneName}
Address: ${data.partyOneAddress}

FREELANCER: ${data.partyTwoName}
Address: ${data.partyTwoAddress}

1. SERVICES
Freelancer agrees to provide the following services:
${data.projectDescription || 'Professional services as outlined in the project specification and agreed upon by both parties.'}

2. DELIVERABLES
The specific deliverables to be provided include:
${data.deliverables || '- Completed project deliverables as specified\n- Regular progress reports\n- Final project documentation\n- Any additional items as mutually agreed'}

3. TIMELINE
Project Start Date: ${data.effectiveDate}
Project Completion Date: ${data.deadline || 'To be determined based on project scope'}

4. COMPENSATION AND PAYMENT
Payment Terms: ${data.paymentTerms || 'Payment structure to be agreed upon based on project milestones'}

Payment Schedule:
- Invoices will be submitted monthly or upon completion of milestones
- Payment is due within 30 days of invoice receipt
- Late payments may incur additional fees

5. INDEPENDENT CONTRACTOR STATUS
Freelancer is an independent contractor and not an employee of Client. Freelancer is responsible for:
- All applicable taxes and withholdings
- Own equipment and workspace
- Professional liability and general liability insurance

6. INTELLECTUAL PROPERTY
All work product, including but not limited to designs, code, documentation, and other deliverables created under this Agreement, shall be the exclusive property of Client upon full payment.

7. CONFIDENTIALITY
Freelancer agrees to maintain confidentiality of all Client information and not to disclose any confidential information to third parties.

8. TERMINATION
Either party may terminate this Agreement with written notice. Upon termination:
- Client shall pay for all work completed to date
- Freelancer shall deliver all work product and materials to Client

9. LIABILITY AND INDEMNIFICATION
Freelancer's liability shall be limited to the amount paid under this Agreement. Each party shall indemnify the other against claims arising from their own negligent acts or omissions.

10. GOVERNING LAW
This Agreement shall be governed by applicable laws.

IN WITNESS WHEREOF, the parties have executed this Agreement as of the date first written above.

CLIENT:                            FREELANCER:

_____________________             _____________________
${data.partyOneName}              ${data.partyTwoName}
Date: _______________             Date: _______________`;
    };

    const generateServiceAgreement = (data: FormData): string => {
        return `SERVICE LEVEL AGREEMENT

This Service Level Agreement ("SLA") is entered into on ${data.effectiveDate} between:

SERVICE PROVIDER: ${data.partyOneName}
Address: ${data.partyOneAddress}

CLIENT: ${data.partyTwoName}
Address: ${data.partyTwoAddress}

1. SERVICES
Service Provider agrees to provide the following services:
${data.serviceDescription || 'Professional services as outlined in the service specification document and mutually agreed upon by both parties.'}

2. SERVICE LEVELS
Service Provider commits to the following service levels:
- Availability: 99.9% uptime during business hours
- Response Time: Initial response within 4 business hours
- Resolution Time: Issue resolution within agreed timeframes based on severity
- Quality Standards: Services will meet or exceed industry standards

3. PERFORMANCE METRICS
The following metrics will be used to measure service performance:
- System availability and uptime
- Response and resolution times
- Customer satisfaction scores
- Service quality assessments

4. FEES AND PAYMENT
Service Fee: ${data.serviceFee || 'As per agreed pricing schedule'}
Payment Schedule: ${data.paymentSchedule || 'Monthly payments due within 30 days of invoice'}

Billing Terms:
- Invoices will be sent monthly in advance
- Late payments may incur interest charges
- Disputed charges must be reported within 30 days

5. TERM AND TERMINATION
Initial Term: 12 months from the effective date
Renewal: Automatic renewal for successive 12-month periods unless terminated
Termination Notice: ${data.terminationNotice || '30 days'} written notice required

6. SUPPORT AND MAINTENANCE
Service Provider will provide:
- Regular system monitoring and maintenance
- Technical support during business hours
- Emergency support for critical issues
- Regular performance reporting

7. RESPONSIBILITIES
Service Provider Responsibilities:
- Deliver services according to agreed specifications
- Maintain qualified personnel
- Provide regular status reports
- Ensure data security and confidentiality

Client Responsibilities:
- Provide necessary access and information
- Pay fees according to agreed schedule
- Cooperate in problem resolution
- Maintain appropriate security measures

8. LIABILITY AND REMEDIES
Service Level Credits: If service levels are not met, Client may be entitled to service credits as specified in the attached schedule.
Limitation of Liability: Service Provider's liability is limited to the fees paid in the preceding 12 months.

9. CONFIDENTIALITY
Both parties agree to maintain confidentiality of proprietary information disclosed during the term of this Agreement.

10. GOVERNING LAW
This Agreement shall be governed by applicable laws.

IN WITNESS WHEREOF, the parties have executed this Agreement as of the date first written above.

SERVICE PROVIDER:                  CLIENT:

_____________________             _____________________
${data.partyOneName}              ${data.partyTwoName}
Date: _______________             Date: _______________`;
    };

    const generateContract = async () => {
        setIsGenerating(true);

        // Simulate AI generation delay
        await new Promise(resolve => setTimeout(resolve, 2000));

        let contractContent = '';

        switch (template.name) {
            case 'Non-Disclosure Agreement':
                contractContent = generateNDAContract(formData);
                break;
            case 'Employment Agreement':
                contractContent = generateEmploymentContract(formData);
                break;
            case 'Freelance Contract':
                contractContent = generateFreelanceContract(formData);
                break;
            case 'Service Level Agreement':
                contractContent = generateServiceAgreement(formData);
                break;
            default:
                contractContent = `GENERIC CONTRACT TEMPLATE

This agreement is entered into on ${formData.effectiveDate} between:

PARTY ONE: ${formData.partyOneName}
Address: ${formData.partyOneAddress}

PARTY TWO: ${formData.partyTwoName}
Address: ${formData.partyTwoAddress}

[Contract terms to be customized based on specific requirements]

IN WITNESS WHEREOF, the parties have executed this Agreement as of the date first written above.

_____________________             _____________________
${formData.partyOneName}          ${formData.partyTwoName}
Date: _______________             Date: _______________`;
        }

        setGeneratedContract(contractContent);
        setIsGenerating(false);
        setCurrentStep(3);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(generatedContract);
        alert('Contract copied to clipboard!');
    };

    const downloadContract = () => {
        const element = document.createElement('a');
        const file = new Blob([generatedContract], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = `${template.name.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.txt`;
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    };

    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <div className="space-y-6">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <FileText className="w-8 h-8 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Generate {template.name}</h3>
                            <p className="text-gray-600">Fill in the basic information to generate your custom contract</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    <User className="w-4 h-4 inline mr-1" />
                                    Party One Name
                                </label>
                                <input
                                    type="text"
                                    value={formData.partyOneName}
                                    onChange={(e) => handleInputChange('partyOneName', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Enter first party name"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    <User className="w-4 h-4 inline mr-1" />
                                    Party Two Name
                                </label>
                                <input
                                    type="text"
                                    value={formData.partyTwoName}
                                    onChange={(e) => handleInputChange('partyTwoName', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Enter second party name"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    <Building className="w-4 h-4 inline mr-1" />
                                    Party One Address
                                </label>
                                <input
                                    type="text"
                                    value={formData.partyOneAddress}
                                    onChange={(e) => handleInputChange('partyOneAddress', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Enter first party address"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    <Building className="w-4 h-4 inline mr-1" />
                                    Party Two Address
                                </label>
                                <input
                                    type="text"
                                    value={formData.partyTwoAddress}
                                    onChange={(e) => handleInputChange('partyTwoAddress', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Enter second party address"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    <Calendar className="w-4 h-4 inline mr-1" />
                                    Effective Date
                                </label>
                                <input
                                    type="date"
                                    value={formData.effectiveDate}
                                    onChange={(e) => handleInputChange('effectiveDate', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <button
                                type="button"
                                onClick={() => setCurrentStep(2)}
                                disabled={!formData.partyOneName || !formData.partyTwoName}
                                className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200"
                            >
                                Next Step
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </button>
                        </div>
                    </div>
                );

            case 2:
                return (
                    <div className="space-y-6">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Zap className="w-8 h-8 text-green-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Specific Details</h3>
                            <p className="text-gray-600">Add specific details for your {template.name}</p>
                        </div>

                        {template.name === 'Non-Disclosure Agreement' && (
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        <Clock className="w-4 h-4 inline mr-1" />
                                        Confidentiality Period
                                    </label>
                                    <select
                                        value={formData.confidentialityPeriod || ''}
                                        onChange={(e) => handleInputChange('confidentialityPeriod', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    >
                                        <option value="">Select period</option>
                                        <option value="1 year">1 Year</option>
                                        <option value="2 years">2 Years</option>
                                        <option value="3 years">3 Years</option>
                                        <option value="5 years">5 Years</option>
                                        <option value="indefinite">Indefinite</option>
                                    </select>
                                </div>
                            </div>
                        )}

                        {template.name === 'Employment Agreement' && (
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Position Title</label>
                                    <input
                                        type="text"
                                        value={formData.position || ''}
                                        onChange={(e) => handleInputChange('position', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="e.g., Software Developer"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        <DollarSign className="w-4 h-4 inline mr-1" />
                                        Annual Salary
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.salary || ''}
                                        onChange={(e) => handleInputChange('salary', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="e.g., $75,000"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                                    <input
                                        type="date"
                                        value={formData.startDate || ''}
                                        onChange={(e) => handleInputChange('startDate', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Benefits</label>
                                    <textarea
                                        value={formData.benefits || ''}
                                        onChange={(e) => handleInputChange('benefits', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        rows={3}
                                        placeholder="e.g., Health insurance, 401k, PTO"
                                    />
                                </div>
                            </div>
                        )}

                        {template.name === 'Freelance Contract' && (
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Project Description</label>
                                    <textarea
                                        value={formData.projectDescription || ''}
                                        onChange={(e) => handleInputChange('projectDescription', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        rows={3}
                                        placeholder="Describe the project scope and requirements"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Deliverables</label>
                                    <textarea
                                        value={formData.deliverables || ''}
                                        onChange={(e) => handleInputChange('deliverables', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        rows={3}
                                        placeholder="List specific deliverables"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Payment Terms</label>
                                    <input
                                        type="text"
                                        value={formData.paymentTerms || ''}
                                        onChange={(e) => handleInputChange('paymentTerms', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="e.g., $5,000 - 50% upfront, 50% on completion"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Project Deadline</label>
                                    <input
                                        type="date"
                                        value={formData.deadline || ''}
                                        onChange={(e) => handleInputChange('deadline', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                            </div>
                        )}

                        {template.name === 'Service Level Agreement' && (
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Service Description</label>
                                    <textarea
                                        value={formData.serviceDescription || ''}
                                        onChange={(e) => handleInputChange('serviceDescription', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        rows={3}
                                        placeholder="Describe the services to be provided"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Service Fee</label>
                                    <input
                                        type="text"
                                        value={formData.serviceFee || ''}
                                        onChange={(e) => handleInputChange('serviceFee', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="e.g., $2,000/month"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Payment Schedule</label>
                                    <select
                                        value={formData.paymentSchedule || ''}
                                        onChange={(e) => handleInputChange('paymentSchedule', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    >
                                        <option value="">Select payment schedule</option>
                                        <option value="Monthly in advance">Monthly in advance</option>
                                        <option value="Monthly in arrears">Monthly in arrears</option>
                                        <option value="Quarterly in advance">Quarterly in advance</option>
                                        <option value="Annually in advance">Annually in advance</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Termination Notice</label>
                                    <select
                                        value={formData.terminationNotice || ''}
                                        onChange={(e) => handleInputChange('terminationNotice', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    >
                                        <option value="">Select notice period</option>
                                        <option value="7 days">7 Days</option>
                                        <option value="14 days">14 Days</option>
                                        <option value="30 days">30 Days</option>
                                        <option value="60 days">60 Days</option>
                                        <option value="90 days">90 Days</option>
                                    </select>
                                </div>
                            </div>
                        )}

                        <div className="flex justify-between">
                            <button
                                type="button"
                                onClick={() => setCurrentStep(1)}
                                className="flex items-center px-6 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                            >
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back
                            </button>
                            <button
                                type="button"
                                onClick={generateContract}
                                disabled={isGenerating}
                                className="flex items-center px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200"
                            >
                                {isGenerating ? (
                                    <>
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                        Generating...
                                    </>
                                ) : (
                                    <>
                                        <Zap className="w-4 h-4 mr-2" />
                                        Generate Contract
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                );

            case 3:
                return (
                    <div className="space-y-6">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <FileText className="w-8 h-8 text-green-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Contract Generated!</h3>
                            <p className="text-gray-600">Your {template.name} has been successfully generated</p>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-4 max-h-96 overflow-y-auto">
                            <pre className="whitespace-pre-wrap text-sm text-gray-800 font-mono leading-relaxed">
                                {generatedContract}
                            </pre>
                        </div>

                        <div className="flex justify-center space-x-4">
                            <button
                                type="button"
                                onClick={copyToClipboard}
                                className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                            >
                                <Copy className="w-4 h-4 mr-2" />
                                Copy to Clipboard
                            </button>
                            <button
                                type="button"
                                onClick={downloadContract}
                                className="flex items-center px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
                            >
                                <Download className="w-4 h-4 mr-2" />
                                Download Contract
                            </button>
                        </div>

                        <div className="flex justify-between">
                            <button
                                type="button"
                                onClick={() => {
                                    setCurrentStep(1);
                                    setGeneratedContract('');
                                }}
                                className="flex items-center px-6 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                            >
                                Generate Another
                            </button>
                            <button
                                type="button"
                                onClick={onClose}
                                className="flex items-center px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-2xl">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                <Zap className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold text-gray-900">AI Contract Generator</h2>
                                <p className="text-sm text-gray-600">{template.name}</p>
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                            title="Close"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Progress Steps */}
                    <div className="flex items-center justify-center mt-6 space-x-4">
                        {[1, 2, 3].map((step) => (
                            <div key={step} className="flex items-center">
                                <div
                                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${currentStep >= step
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-gray-200 text-gray-600'
                                        }`}
                                >
                                    {step}
                                </div>
                                {step < 3 && (
                                    <div
                                        className={`w-12 h-0.5 mx-2 ${currentStep > step ? 'bg-blue-600' : 'bg-gray-200'
                                            }`}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="p-6">
                    {renderStepContent()}
                </div>
            </div>
        </div>
    );
}