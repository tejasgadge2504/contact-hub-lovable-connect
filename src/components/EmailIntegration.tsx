
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Mail, Send, Webhook } from 'lucide-react';

export const EmailIntegration = () => {
  const [webhookUrl, setWebhookUrl] = useState('');
  const [testEmail, setTestEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleWebhookTest = async () => {
    if (!webhookUrl) {
      toast({
        title: "Error",
        description: "Please enter a webhook URL",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "no-cors",
        body: JSON.stringify({
          event: "new_contact_added",
          contact: {
            name: "Test Contact",
            email: testEmail || "test@example.com",
            timestamp: new Date().toISOString(),
          },
          triggered_from: "Contact Management System",
        }),
      });

      toast({
        title: "Webhook Triggered",
        description: "Test webhook sent successfully. Check your integration to confirm receipt.",
      });
    } catch (error) {
      console.error("Error triggering webhook:", error);
      toast({
        title: "Error",
        description: "Failed to trigger webhook. Please check the URL and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="bg-white shadow-sm border border-gray-200">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Mail className="h-5 w-5" />
          <span>Email Integration</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="webhook-url" className="text-sm font-medium text-gray-700">
              Zapier Webhook URL
            </Label>
            <Input
              id="webhook-url"
              value={webhookUrl}
              onChange={(e) => setWebhookUrl(e.target.value)}
              placeholder="https://hooks.zapier.com/hooks/catch/..."
              className="mt-1"
            />
            <p className="text-xs text-gray-500 mt-1">
              Create a Zap with a "Catch Hook" trigger and paste the webhook URL here.
            </p>
          </div>

          <div>
            <Label htmlFor="test-email" className="text-sm font-medium text-gray-700">
              Test Email (Optional)
            </Label>
            <Input
              id="test-email"
              type="email"
              value={testEmail}
              onChange={(e) => setTestEmail(e.target.value)}
              placeholder="test@example.com"
              className="mt-1"
            />
          </div>

          <Button 
            onClick={handleWebhookTest}
            disabled={isLoading || !webhookUrl}
            className="w-full"
          >
            <Send className="h-4 w-4 mr-2" />
            {isLoading ? 'Sending Test...' : 'Test Webhook'}
          </Button>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-start space-x-2">
            <Webhook className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-blue-900">Setup Instructions</h4>
              <ol className="text-xs text-blue-800 mt-2 space-y-1 list-decimal list-inside">
                <li>Go to Zapier and create a new Zap</li>
                <li>Choose "Webhooks by Zapier" as the trigger</li>
                <li>Select "Catch Hook" event</li>
                <li>Copy the webhook URL and paste it above</li>
                <li>Set up your email action (Gmail, Outlook, etc.)</li>
                <li>Test the webhook using the button above</li>
              </ol>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
