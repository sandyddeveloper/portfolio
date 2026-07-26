"use client";

import React from "react";
import { MultiStepLoader as Loader } from "@/components/ui/multi-step-loader";

export const CONTACT_LOADING_STATES = [
  {
    text: "Connecting to Santhosh Raj's Secure Relay",
  },
  {
    text: "Encrypting Message Payload & Credentials",
  },
  {
    text: "Validating Direct Developer Inbox & WhatsApp Webhook",
  },
  {
    text: "Dispatching Instant Telemetry Notification",
  },
  {
    text: "Message Successfully Delivered!",
  },
];

export default function MultiStepLoaderDemo({
  loading,
  onClose,
}: {
  loading: boolean;
  onClose?: () => void;
}) {
  return (
    <Loader
      loadingStates={CONTACT_LOADING_STATES}
      loading={loading}
      duration={1000}
      loop={false}
      onClose={onClose}
    />
  );
}
