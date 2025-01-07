"use client";

import { Button } from "@nextui-org/react";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <header className="border-b border-gray-200 bg-gray-50">
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                Gestión de ingresos y gastos
              </h1>

              <p className="mt-1.5 text-sm text-gray-500">
                Una forma sencilla de gestionar tus ingresos y gastos.
              </p>
            </div>

            <div className="flex items-center gap-4">
              <Button
                as={Link}
                color="primary"
                href="/dashboard/add"
                variant="solid"
              >
                Añadir nuevo
              </Button>
            </div>
          </div>
        </div>
      </header>
      {children}
    </>
  );
}
