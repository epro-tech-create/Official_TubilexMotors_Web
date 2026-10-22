const questions = [
  [
    "What types of vehicles can I find at Tubilex?",
    "We work with a range of sedans, SUVs, pickups and luxury vehicles. Browse our collection or tell us what you’re looking for, and our team can help you explore sourcing options.",
  ],
  [
    "Can you help me import a specific car?",
    "Yes. Tell us the make, model and budget you have in mind. We’ll discuss sourcing, import requirements, timelines and costs with you before you decide.",
  ],
  [
    "How do I arrange a viewing?",
    "Contact us on +255 788 835 182 or send an enquiry through the website. Our team will confirm vehicle availability and arrange a suitable time at our Mbezi Luis showroom.",
  ],
  [
    "Do you help with registration and insurance?",
    "Our team can guide you through registration, licensing and insurance. Please speak with us about the requirements and costs for your vehicle.",
  ],
  [
    "Can I discuss financing or payment options?",
    "Get in touch with our team to discuss current payment and financing options. Availability and terms depend on the vehicle and the relevant provider.",
  ],
];
export function FAQ() {
  return (
    <div className="faq-list">
      {questions.map(([q, a], i) => (
        <details key={q}>
          <summary>
            <span className="faq-number">0{i + 1}</span>
            {q}
            <span className="faq-plus">+</span>
          </summary>
          <p>{a}</p>
        </details>
      ))}
    </div>
  );
}
