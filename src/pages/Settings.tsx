import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { 
  Server, 
  Key, 
  Bell, 
  Shield, 
  Save,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  Loader2
} from "lucide-react";
import { cn } from "@/lib/utils";

const Settings = () => {
  const [apiUrl, setApiUrl] = useState("http://localhost:8000");
  const [apiKey, setApiKey] = useState("");
  const [isTestingConnection, setIsTestingConnection] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<"idle" | "success" | "error">("idle");

  const testConnection = async () => {
    setIsTestingConnection(true);
    setConnectionStatus("idle");
    
    // Simulate API test
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    if (apiUrl && apiKey) {
      setConnectionStatus("success");
      toast.success("Connection successful!", {
        description: "SecureOpsNexus API is reachable."
      });
    } else {
      setConnectionStatus("error");
      toast.error("Connection failed", {
        description: "Please check your API URL and key."
      });
    }
    
    setIsTestingConnection(false);
  };

  const saveSettings = () => {
    localStorage.setItem("secureops_api_url", apiUrl);
    localStorage.setItem("secureops_api_key", apiKey);
    toast.success("Settings saved!", {
      description: "Your configuration has been updated."
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      
      <main className="ml-64 p-8">
        <Header 
          title="Settings" 
          subtitle="Configure your SecureOpsNexus connection and preferences"
        />

        <Tabs defaultValue="api" className="space-y-6">
          <TabsList className="bg-secondary/50 p-1">
            <TabsTrigger value="api" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Server className="h-4 w-4 mr-2" />
              API Connection
            </TabsTrigger>
            <TabsTrigger value="security" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Shield className="h-4 w-4 mr-2" />
              Security
            </TabsTrigger>
            <TabsTrigger value="notifications" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
            </TabsTrigger>
          </TabsList>

          <TabsContent value="api" className="space-y-6">
            <div className="glass-card rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-1">Backend API Configuration</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Connect to your SecureOpsNexus Django backend server.
              </p>

              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="api-url">API Base URL</Label>
                  <Input
                    id="api-url"
                    placeholder="http://localhost:8000"
                    value={apiUrl}
                    onChange={(e) => setApiUrl(e.target.value)}
                    className="bg-secondary/50 border-border/50 font-mono"
                  />
                  <p className="text-xs text-muted-foreground">
                    The base URL of your SecureOpsNexus Django server
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="api-key">API Key</Label>
                  <div className="relative">
                    <Key className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="api-key"
                      type="password"
                      placeholder="Enter your API key"
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      className="pl-10 bg-secondary/50 border-border/50"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Generate an API key from your Django admin panel
                  </p>
                </div>

                {/* Connection Status */}
                {connectionStatus !== "idle" && (
                  <div className={cn(
                    "flex items-center gap-3 p-4 rounded-lg border animate-fade-in",
                    connectionStatus === "success" 
                      ? "bg-success/10 border-success/30 text-success"
                      : "bg-destructive/10 border-destructive/30 text-destructive"
                  )}>
                    {connectionStatus === "success" ? (
                      <CheckCircle2 className="h-5 w-5" />
                    ) : (
                      <AlertCircle className="h-5 w-5" />
                    )}
                    <span className="font-medium">
                      {connectionStatus === "success" 
                        ? "Connection successful" 
                        : "Connection failed"}
                    </span>
                  </div>
                )}

                <div className="flex items-center gap-3 pt-4">
                  <Button 
                    variant="outline" 
                    onClick={testConnection}
                    disabled={isTestingConnection}
                  >
                    {isTestingConnection ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <RefreshCw className="h-4 w-4 mr-2" />
                    )}
                    Test Connection
                  </Button>
                  <Button onClick={saveSettings}>
                    <Save className="h-4 w-4 mr-2" />
                    Save Settings
                  </Button>
                </div>
              </div>
            </div>

            {/* API Endpoints Reference */}
            <div className="glass-card rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">API Endpoints</h3>
              <div className="space-y-3">
                {[
                  { method: "GET", path: "/api/threats/", description: "List all threats" },
                  { method: "POST", path: "/api/incidents/", description: "Create incident" },
                  { method: "GET", path: "/api/assets/", description: "List assets" },
                  { method: "GET", path: "/api/reports/", description: "Generate reports" },
                ].map((endpoint) => (
                  <div 
                    key={endpoint.path}
                    className="flex items-center justify-between p-3 rounded-lg bg-secondary/30"
                  >
                    <div className="flex items-center gap-3">
                      <span className={cn(
                        "px-2 py-1 rounded text-xs font-mono font-bold",
                        endpoint.method === "GET" 
                          ? "bg-success/20 text-success" 
                          : "bg-warning/20 text-warning"
                      )}>
                        {endpoint.method}
                      </span>
                      <code className="text-sm font-mono text-foreground">{endpoint.path}</code>
                    </div>
                    <span className="text-sm text-muted-foreground">{endpoint.description}</span>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <div className="glass-card rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-6">Security Settings</h3>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">
                      Require 2FA for all security operations
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Auto-block Suspicious IPs</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically block IPs with suspicious activity
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Real-time Threat Detection</Label>
                    <p className="text-sm text-muted-foreground">
                      Enable ML-powered threat detection
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <div className="glass-card rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-6">Notification Preferences</h3>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Critical Alerts</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive immediate notifications for critical threats
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Daily Summary</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive daily security summary reports
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Incident Updates</Label>
                    <p className="text-sm text-muted-foreground">
                      Get notified when incidents are updated
                    </p>
                  </div>
                  <Switch />
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Settings;
