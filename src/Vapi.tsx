// src/components/VrittiAIWidget.tsx
import { useEffect } from "react";

const VrittiAIWidget = () => {
  useEffect(() => {
    // Inject the Vapi script if not already present
    if (!document.getElementById("vapi-widget-script")) {
      const script = document.createElement("script");
      script.src =
        "https://unpkg.com/@vapi-ai/client-sdk-react/dist/embed/widget.umd.js";
      script.async = true;
      script.id = "vapi-widget-script";
      script.type = "text/javascript";
      document.body.appendChild(script);
    }
  }, []);

  return (
    <vapi-widget
      public-key="4c39557c-f17c-4c3e-9ba1-754cf6fd591e"
      assistant-id="57740cca-3052-477c-a491-a42f1a7bf022"
      mode="voice"
      theme="dark"
      base-bg-color="#000000"
      accent-color="#14B8A6"
      cta-button-color="#000000"
      cta-button-text-color="#ffffff"   
      border-radius="large"
      size="full"
      position="bottom-right"
      title="Vritti AI"
      start-button-text="Start"
      end-button-text="End Call"
      cta-subtitle="A gentle ear. Honest guidance. Always here for you"
      chat-first-message="Hey, How can I help you today?"
      chat-placeholder="Type your message..."
      voice-show-transcript="true"
      consent-required="true"
      consent-title="Terms and conditions"
      consent-content="By clicking “Agree,” and each time you interact with this AI agent, you consent to the recording, storage, and use of your messages by us and our service providers, as described in our Terms of Service and Privacy Policy."
      consent-storage-key="vapi_widget_consent"
    ></vapi-widget>
  );
};

export default VrittiAIWidget;
