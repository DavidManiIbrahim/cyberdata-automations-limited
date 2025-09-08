import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Settings as SettingsIcon, Bell, Shield, Palette, Globe } from "lucide-react";

const Settings = () => {
  const [notifications, setNotifications] = useState({
    emailUpdates: true,
    courseReminders: true,
    assignmentDeadlines: true,
    marketing: false,
  });

  const [preferences, setPreferences] = useState({
    language: "en",
    timezone: "UTC-5",
    theme: "light",
  });

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Settings
        </h1>
        <p className="text-muted-foreground text-lg">
          Customize your learning experience and account preferences.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Notifications */}
        <Card className="shadow-soft">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" />
              <CardTitle>Notifications</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="email-updates">Email Updates</Label>
              <Switch
                id="email-updates"
                checked={notifications.emailUpdates}
                onCheckedChange={(checked) =>
                  setNotifications(prev => ({ ...prev, emailUpdates: checked }))
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="course-reminders">Course Reminders</Label>
              <Switch
                id="course-reminders"
                checked={notifications.courseReminders}
                onCheckedChange={(checked) =>
                  setNotifications(prev => ({ ...prev, courseReminders: checked }))
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="assignment-deadlines">Assignment Deadlines</Label>
              <Switch
                id="assignment-deadlines"
                checked={notifications.assignmentDeadlines}
                onCheckedChange={(checked) =>
                  setNotifications(prev => ({ ...prev, assignmentDeadlines: checked }))
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="marketing">Marketing Emails</Label>
              <Switch
                id="marketing"
                checked={notifications.marketing}
                onCheckedChange={(checked) =>
                  setNotifications(prev => ({ ...prev, marketing: checked }))
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* Preferences */}
        <Card className="shadow-soft">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Palette className="h-5 w-5 text-secondary" />
              <CardTitle>Preferences</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Language</Label>
              <Select value={preferences.language} onValueChange={(value) =>
                setPreferences(prev => ({ ...prev, language: value }))
              }>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Spanish</SelectItem>
                  <SelectItem value="fr">French</SelectItem>
                  <SelectItem value="de">German</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Timezone</Label>
              <Select value={preferences.timezone} onValueChange={(value) =>
                setPreferences(prev => ({ ...prev, timezone: value }))
              }>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="UTC-8">Pacific Time (UTC-8)</SelectItem>
                  <SelectItem value="UTC-7">Mountain Time (UTC-7)</SelectItem>
                  <SelectItem value="UTC-6">Central Time (UTC-6)</SelectItem>
                  <SelectItem value="UTC-5">Eastern Time (UTC-5)</SelectItem>
                  <SelectItem value="UTC+0">GMT (UTC+0)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Theme</Label>
              <Select value={preferences.theme} onValueChange={(value) =>
                setPreferences(prev => ({ ...prev, theme: value }))
              }>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="auto">Auto</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Privacy & Security */}
        <Card className="shadow-soft">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-accent" />
              <CardTitle>Privacy & Security</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="w-full justify-start">
              Change Password
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Two-Factor Authentication
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Privacy Settings
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Download My Data
            </Button>
          </CardContent>
        </Card>

        {/* Account Actions */}
        <Card className="shadow-soft">
          <CardHeader>
            <div className="flex items-center gap-2">
              <SettingsIcon className="h-5 w-5 text-success" />
              <CardTitle>Account</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="w-full justify-start">
              Export Learning Progress
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Backup Settings
            </Button>
            <Button variant="outline" className="w-full justify-start text-destructive hover:text-destructive">
              Delete Account
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button size="lg" className="px-8">
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default Settings;