import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Service } from "@/types";

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <Card className="hover:shadow-hover transition-shadow duration-300 overflow-hidden">
      {service.image_url && (
        <div className="w-full h-48 overflow-hidden">
          <img
            src={service.image_url}
            alt={service.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      <CardHeader>
        {service.icon && (
          <div className="w-16 h-16 bg-secondary rounded-lg flex items-center justify-center text-4xl mb-4">
            {service.icon}
          </div>
        )}
        <CardTitle className="text-xl">{service.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{service.description}</p>
      </CardContent>
    </Card>
  );
}
