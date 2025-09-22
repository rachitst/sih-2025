// src/components/VrittiAIWidget.tsx
import { useEffect } from "react";

const VrittiAIWidget = () => {
  useEffect(() => {
    // Create an isolated iframe so the widget's styles do not leak globally
    const iframe = document.createElement("iframe");
    iframe.style.position = "fixed";
    iframe.style.bottom = "16px";
    iframe.style.right = "16px";
    iframe.style.width = Math.min(window.innerWidth - 32, 480) + "px";
    iframe.style.height = Math.min(window.innerHeight - 32, 720) + "px";
    iframe.style.border = "0";
    iframe.style.zIndex = "2147483647"; // stay on top
    iframe.style.background = "transparent";
    iframe.setAttribute("title", "Vritti AI Widget");
    // Allow required capabilities for the voice widget
    iframe.setAttribute("allow", "microphone; autoplay; clipboard-write");

    document.body.appendChild(iframe);

    // Responsively resize on viewport changes so it never overlays the whole page
    const handleResize = () => {
      iframe.style.width = Math.min(window.innerWidth - 32, 420) + "px";
      iframe.style.height = Math.min(window.innerHeight - 32, 640) + "px";
    };
    window.addEventListener("resize", handleResize);

    const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
    if (!iframeDoc) {
      return () => {
        document.body.removeChild(iframe);
      };
    }

    // Write a minimal HTML document into the iframe and load the widget there
    iframeDoc.open();
    iframeDoc.write(`<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      html, body { margin: 0; padding: 8px; height: 100%; background: transparent; overflow: hidden; }
      /* Remove any drop shadows inside the widget */
      * { box-shadow: none !important; }
    </style>
    <script src="https://unpkg.com/@vapi-ai/client-sdk-react/dist/embed/widget.umd.js" async id="vapi-widget-script" type="text/javascript"></script>
  </head>
  <body>
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
  </body>
  </html>`);
    iframeDoc.close();

    return () => {
      // Cleanup on unmount
      if (iframe.parentNode) {
        document.body.removeChild(iframe);
      }
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Nothing is rendered in the main document; the widget lives inside the iframe
  return null;
};

export default VrittiAIWidget;
