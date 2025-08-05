"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface PayoutTemplate {
  id: number
  name: string
  amount: number
  currency: string
  frequency: string
  description: string
}

interface PayoutTemplatesProps {
  templates: PayoutTemplate[]
  selectedTemplate: number | null
  onTemplateSelect: (template: PayoutTemplate) => void
}

export function PayoutTemplates({ templates, selectedTemplate, onTemplateSelect }: PayoutTemplatesProps) {
  return (
    <Card className="bg-white shadow-sm border-0 rounded-2xl">
      <CardHeader>
        <CardTitle className="text-lg">Templates</CardTitle>
        <CardDescription>Use a saved template to speed up creation</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {templates.map((template) => (
          <div
            key={template.id}
            className={`p-3 rounded-xl border-2 cursor-pointer transition-colors ${
              selectedTemplate === template.id ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"
            }`}
            onClick={() => onTemplateSelect(template)}
          >
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">{template.name}</h4>
                <p className="text-sm text-muted-foreground">{template.description}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold">${template.amount}</p>
                <Badge variant="secondary" className="text-xs">
                  {template.frequency}
                </Badge>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
