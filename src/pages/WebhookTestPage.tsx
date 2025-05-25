
import React from 'react';
import MainLayout from '@/components/MainLayout';
import WebhookTester from '@/components/WebhookTester';

const WebhookTestPage = () => {
  return (
    <MainLayout title="Webhook Test">
      <div className="container mx-auto py-8">
        <WebhookTester />
      </div>
    </MainLayout>
  );
};

export default WebhookTestPage;
