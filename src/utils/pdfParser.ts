// PDF parsing utility for extracting contract content and analyzing terms
import { fileService } from '../services/fileService';

export interface ContractContent {
  fullText: string;
  sections: ContractSection[];
  keyTerms: KeyTerm[];
  parties: string[];
  contractType: string;
  effectiveDate: string | null;
  expirationDate: string | null;
}

export interface ContractSection {
  title: string;
  content: string;
  sectionNumber?: string;
}

export interface KeyTerm {
  term: string;
  definition: string;
  section: string;
  importance: 'high' | 'medium' | 'low';
}

class PDFParser {
  // Parse PDF content - in a real implementation, this would use a PDF parsing library
  // For now, we'll simulate the parsing with demo content based on the contract name
  async parsePDFContent(contractId: string, contractName: string): Promise<ContractContent> {
    try {
      // In a real implementation, you would:
      // 1. Get the PDF file path from the contract
      // 2. Use a library like pdf2pic, pdf-parse, or similar to extract text
      // 3. Parse the extracted text to identify sections, terms, etc.
      
      // For demo purposes, we'll return structured content based on contract name
      return this.generateDemoContent(contractName);
    } catch (error) {
      console.error('Error parsing PDF:', error);
      throw new Error('Failed to parse PDF content');
    }
  }

  // Generate demo content based on contract type (simulating real PDF parsing)
  private generateDemoContent(contractName: string): ContractContent {
    const name = contractName.toLowerCase();
    
    if (name.includes('service') || name.includes('agreement')) {
      return this.generateServiceAgreementContent();
    } else if (name.includes('employment')) {
      return this.generateEmploymentContent();
    } else if (name.includes('nda') || name.includes('disclosure')) {
      return this.generateNDAContent();
    } else if (name.includes('freelance')) {
      return this.generateFreelanceContent();
    } else {
      return this.generateGenericContent();
    }
  }

  private generateServiceAgreementContent(): ContractContent {
    return {
      fullText: `SERVICE AGREEMENT

This Service Agreement ("Agreement") is entered into on [DATE], between TechCorp Solutions ("Company") and Professional Services Inc. ("Service Provider").

1. SCOPE OF SERVICES
Service Provider shall provide software development services including:
- Web application development
- Database design and implementation  
- API integration services
- Technical documentation

2. PAYMENT TERMS
- Total contract value: $50,000
- Payment schedule: Net 30 days
- Late payment penalty: 1.5% per month
- Currency: USD

3. TERM AND TERMINATION
- Initial term: 12 months
- Auto-renewal: Yes, with 30-day notice
- Termination for convenience: 30 days written notice
- Termination for cause: Immediate upon material breach

4. LIABILITY AND INDEMNIFICATION
- Service Provider liability limited to contract value
- Company indemnifies against third-party claims
- No consequential damages

5. INTELLECTUAL PROPERTY
- All work product belongs to Company
- Service Provider retains pre-existing IP
- Confidentiality obligations survive termination

6. GOVERNING LAW
This Agreement shall be governed by the laws of [STATE].`,

      sections: [
        {
          title: "Scope of Services",
          content: "Service Provider shall provide software development services including web application development, database design and implementation, API integration services, and technical documentation.",
          sectionNumber: "1"
        },
        {
          title: "Payment Terms", 
          content: "Total contract value: $50,000. Payment schedule: Net 30 days. Late payment penalty: 1.5% per month. Currency: USD.",
          sectionNumber: "2"
        },
        {
          title: "Term and Termination",
          content: "Initial term: 12 months with auto-renewal. 30-day written notice required for termination. Immediate termination allowed for material breach.",
          sectionNumber: "3"
        },
        {
          title: "Liability and Indemnification",
          content: "Service Provider liability limited to contract value. Company indemnifies against third-party claims. No consequential damages.",
          sectionNumber: "4"
        }
      ],

      keyTerms: [
        {
          term: "Material Breach",
          definition: "A violation of contract terms that substantially defeats the purpose of the agreement",
          section: "Term and Termination",
          importance: "high"
        },
        {
          term: "Work Product",
          definition: "All deliverables, documentation, and intellectual property created under this agreement",
          section: "Intellectual Property", 
          importance: "high"
        },
        {
          term: "Net 30",
          definition: "Payment is due within 30 days of invoice date",
          section: "Payment Terms",
          importance: "medium"
        }
      ],

      parties: ["TechCorp Solutions", "Professional Services Inc."],
      contractType: "Service Agreement",
      effectiveDate: "2024-01-15",
      expirationDate: "2025-01-15"
    };
  }

  private generateEmploymentContent(): ContractContent {
    return {
      fullText: `EMPLOYMENT AGREEMENT

This Employment Agreement is between DataTech Inc. ("Company") and John Smith ("Employee").

1. POSITION AND DUTIES
Employee is hired as Senior Software Engineer with responsibilities including:
- Full-stack web development
- Code review and mentoring
- Technical architecture decisions
- Project management

2. COMPENSATION
- Base salary: $120,000 annually
- Bonus eligibility: Up to 15% of base salary
- Stock options: 1,000 shares vesting over 4 years
- Benefits: Health, dental, vision, 401k matching

3. TERM OF EMPLOYMENT
- At-will employment
- 90-day probationary period
- Notice period: 2 weeks standard

4. CONFIDENTIALITY
- Employee must protect all confidential information
- Non-disclosure obligations survive termination
- Return of company property required

5. NON-COMPETE
- 12-month non-compete period in same industry
- Geographic restriction: 50-mile radius
- Non-solicitation of employees and customers`,

      sections: [
        {
          title: "Position and Duties",
          content: "Employee is hired as Senior Software Engineer with responsibilities including full-stack web development, code review and mentoring, technical architecture decisions, and project management.",
          sectionNumber: "1"
        },
        {
          title: "Compensation",
          content: "Base salary: $120,000 annually. Bonus eligibility: Up to 15% of base salary. Stock options: 1,000 shares vesting over 4 years. Benefits include health, dental, vision, 401k matching.",
          sectionNumber: "2"
        },
        {
          title: "Non-Compete",
          content: "12-month non-compete period in same industry. Geographic restriction: 50-mile radius. Non-solicitation of employees and customers.",
          sectionNumber: "5"
        }
      ],

      keyTerms: [
        {
          term: "At-Will Employment",
          definition: "Employment can be terminated by either party at any time for any reason",
          section: "Term of Employment",
          importance: "high"
        },
        {
          term: "Vesting",
          definition: "The process by which stock options become exercisable over time",
          section: "Compensation",
          importance: "medium"
        },
        {
          term: "Non-Compete",
          definition: "Restriction preventing employee from working for competitors for specified period",
          section: "Non-Compete",
          importance: "high"
        }
      ],

      parties: ["DataTech Inc.", "John Smith"],
      contractType: "Employment Agreement",
      effectiveDate: "2024-02-01", 
      expirationDate: null
    };
  }

  private generateNDAContent(): ContractContent {
    return {
      fullText: `NON-DISCLOSURE AGREEMENT

This Non-Disclosure Agreement is between InnovateTech Corp. ("Disclosing Party") and Sarah Johnson ("Receiving Party").

1. CONFIDENTIAL INFORMATION
Confidential Information includes:
- Technical specifications and designs
- Business plans and financial information
- Customer lists and market data
- Proprietary software and algorithms
- Any information marked as confidential

2. OBLIGATIONS
Receiving Party agrees to:
- Keep all information strictly confidential
- Use information only for evaluation purposes
- Not disclose to any third parties
- Return all materials upon request

3. TERM
- Duration: 5 years from execution
- Survival: Confidentiality obligations survive agreement termination
- No expiration for trade secrets

4. EXCEPTIONS
Information is not confidential if it:
- Is publicly available
- Was known prior to disclosure
- Is independently developed
- Is required to be disclosed by law`,

      sections: [
        {
          title: "Confidential Information",
          content: "Includes technical specifications, business plans, customer lists, proprietary software, and any information marked as confidential.",
          sectionNumber: "1"
        },
        {
          title: "Obligations", 
          content: "Receiving Party must keep information confidential, use only for evaluation, not disclose to third parties, and return materials upon request.",
          sectionNumber: "2"
        },
        {
          title: "Exceptions",
          content: "Information is not confidential if publicly available, previously known, independently developed, or required by law to disclose.",
          sectionNumber: "4"
        }
      ],

      keyTerms: [
        {
          term: "Trade Secrets",
          definition: "Confidential business information that provides competitive advantage",
          section: "Term",
          importance: "high"
        },
        {
          term: "Evaluation Purposes",
          definition: "Using information solely to assess potential business relationships",
          section: "Obligations",
          importance: "medium"
        }
      ],

      parties: ["InnovateTech Corp.", "Sarah Johnson"],
      contractType: "Non-Disclosure Agreement",
      effectiveDate: "2024-03-01",
      expirationDate: "2029-03-01"
    };
  }

  private generateFreelanceContent(): ContractContent {
    return {
      fullText: `FREELANCE CONTRACT

This Freelance Contract is between Creative Agency Ltd. ("Client") and Alex Designer ("Contractor").

1. PROJECT SCOPE
Contractor will provide:
- Logo design and branding
- Website mockups and prototypes  
- Marketing materials design
- Brand guidelines documentation

2. DELIVERABLES AND TIMELINE
- Initial concepts: 1 week
- Revised designs: 2 weeks  
- Final deliverables: 3 weeks
- Brand guidelines: 4 weeks

3. PAYMENT
- Total project fee: $8,500
- Payment schedule: 50% upfront, 50% on completion
- Payment method: Bank transfer
- Late payment: 2% monthly fee

4. REVISIONS
- Included: 3 rounds of revisions
- Additional revisions: $150 per hour
- Major scope changes require new agreement

5. INTELLECTUAL PROPERTY
- Work-for-hire arrangement
- Client owns all final work
- Contractor retains right to portfolio use`,

      sections: [
        {
          title: "Project Scope",
          content: "Contractor will provide logo design and branding, website mockups and prototypes, marketing materials design, and brand guidelines documentation.",
          sectionNumber: "1"
        },
        {
          title: "Payment",
          content: "Total project fee: $8,500. Payment schedule: 50% upfront, 50% on completion. Late payment incurs 2% monthly fee.",
          sectionNumber: "3"
        },
        {
          title: "Revisions",
          content: "3 rounds of revisions included. Additional revisions at $150 per hour. Major scope changes require new agreement.",
          sectionNumber: "4"
        }
      ],

      keyTerms: [
        {
          term: "Work-for-Hire",
          definition: "Arrangement where contractor creates work that is owned by client upon creation",
          section: "Intellectual Property",
          importance: "high"
        },
        {
          term: "Scope Changes",
          definition: "Modifications to originally agreed project requirements",
          section: "Revisions", 
          importance: "medium"
        }
      ],

      parties: ["Creative Agency Ltd.", "Alex Designer"],
      contractType: "Freelance Contract",
      effectiveDate: "2024-01-10",
      expirationDate: "2024-02-10"
    };
  }

  private generateGenericContent(): ContractContent {
    return {
      fullText: `PROFESSIONAL SERVICES AGREEMENT\n\nThis Professional Services Agreement ("Agreement") is entered into between ABC Corporation ("Client") and XYZ Consulting LLC ("Service Provider").\n\n1. SCOPE OF WORK\nService Provider agrees to provide professional consulting services as detailed in the attached Statement of Work, including:\n- Business analysis and recommendations\n- Strategic planning assistance\n- Implementation support\n- Regular progress reporting\n\n2. COMPENSATION AND PAYMENT\n- Service fees: $75 per hour for standard consulting\n- Payment terms: Net 15 days from invoice date\n- Late payment fee: 1% per month on overdue amounts\n- Expenses: Client reimburses pre-approved expenses\n\n3. TERM AND TERMINATION\n- Initial term: 6 months from effective date\n- Either party may terminate with 14 days written notice\n- Immediate termination allowed for material breach\n- Surviving obligations: confidentiality, payment, intellectual property\n\n4. CONFIDENTIALITY\n- Both parties acknowledge access to confidential information\n- Non-disclosure obligations remain in effect for 3 years post-termination\n- Confidential information must be returned upon request\n\n5. INTELLECTUAL PROPERTY\n- Work product created under this agreement belongs to Client\n- Service Provider retains rights to pre-existing intellectual property\n- Service Provider may use general knowledge and experience gained\n\n6. LIMITATION OF LIABILITY\n- Service Provider's liability limited to fees paid in preceding 12 months\n- No liability for indirect, consequential, or punitive damages\n- Client indemnifies Service Provider against third-party claims\n\n7. GOVERNING LAW\nThis Agreement is governed by the laws of [State] and subject to exclusive jurisdiction of [State] courts.`,

      sections: [
        {
          title: "Scope of Work",
          content: "Service Provider agrees to provide professional consulting services including business analysis and recommendations, strategic planning assistance, implementation support, and regular progress reporting.",
          sectionNumber: "1"
        },
        {
          title: "Compensation and Payment",
          content: "Service fees: $75 per hour for standard consulting. Payment terms: Net 15 days from invoice date. Late payment fee: 1% per month on overdue amounts. Client reimburses pre-approved expenses.",
          sectionNumber: "2"
        },
        {
          title: "Term and Termination",
          content: "Initial term: 6 months from effective date. Either party may terminate with 14 days written notice. Immediate termination allowed for material breach.",
          sectionNumber: "3"
        },
        {
          title: "Confidentiality",
          content: "Both parties acknowledge access to confidential information. Non-disclosure obligations remain in effect for 3 years post-termination. Confidential information must be returned upon request.",
          sectionNumber: "4"
        },
        {
          title: "Intellectual Property",
          content: "Work product created under this agreement belongs to Client. Service Provider retains rights to pre-existing intellectual property and may use general knowledge gained.",
          sectionNumber: "5"
        },
        {
          title: "Limitation of Liability",
          content: "Service Provider's liability limited to fees paid in preceding 12 months. No liability for indirect, consequential, or punitive damages. Client provides indemnification.",
          sectionNumber: "6"
        }
      ],

      keyTerms: [
        {
          term: "Material Breach",
          definition: "A significant violation of contract terms that substantially impairs the value of the agreement",
          section: "Term and Termination",
          importance: "high"
        },
        {
          term: "Work Product",
          definition: "All deliverables, documents, and intellectual property created by Service Provider under this agreement",
          section: "Intellectual Property",
          importance: "high"
        },
        {
          term: "Confidential Information",
          definition: "Non-public information disclosed by either party including business plans, financial data, and proprietary processes",
          section: "Confidentiality",
          importance: "high"
        },
        {
          term: "Net 15",
          definition: "Payment is due within 15 days of invoice date",
          section: "Compensation and Payment",
          importance: "medium"
        },
        {
          term: "Indemnification",
          definition: "Agreement by Client to protect Service Provider from legal claims arising from the services provided",
          section: "Limitation of Liability",
          importance: "medium"
        }
      ],

      parties: ["ABC Corporation", "XYZ Consulting LLC"],
      contractType: "Professional Services Agreement",
      effectiveDate: "2024-01-15",
      expirationDate: "2024-07-15"
    };
  }

  // Search for specific terms or sections in the contract
  searchContract(content: ContractContent, query: string): {
    sections: ContractSection[];
    terms: KeyTerm[];
    textMatches: string[];
  } {
    const lowerQuery = query.toLowerCase();
    
    const matchingSections = content.sections.filter(section =>
      section.title.toLowerCase().includes(lowerQuery) ||
      section.content.toLowerCase().includes(lowerQuery)
    );

    const matchingTerms = content.keyTerms.filter(term =>
      term.term.toLowerCase().includes(lowerQuery) ||
      term.definition.toLowerCase().includes(lowerQuery)
    );

    // Find text matches in full contract text
    const sentences = content.fullText.split(/[.!?]+/);
    const textMatches = sentences
      .filter(sentence => sentence.toLowerCase().includes(lowerQuery))
      .map(sentence => sentence.trim())
      .filter(sentence => sentence.length > 0)
      .slice(0, 5); // Limit to top 5 matches

    return {
      sections: matchingSections,
      terms: matchingTerms,
      textMatches
    };
  }

  // Extract key information for specific queries
  extractInfo(content: ContractContent, infoType: string): string {
    switch (infoType.toLowerCase()) {
      case 'parties':
        return `The parties to this contract are: ${content.parties.join(' and ')}.`;
      
      case 'effective_date':
        return content.effectiveDate 
          ? `This contract becomes effective on ${content.effectiveDate}.`
          : 'The effective date is not clearly specified in this contract.';
      
      case 'expiration_date':
        return content.expirationDate
          ? `This contract expires on ${content.expirationDate}.`
          : 'This contract does not have a specified expiration date.';
      
      case 'contract_type':
        return `This is a ${content.contractType}.`;
      
      default:
        return 'I can provide information about parties, effective date, expiration date, and contract type.';
    }
  }
}

// Export singleton instance
export const pdfParser = new PDFParser();