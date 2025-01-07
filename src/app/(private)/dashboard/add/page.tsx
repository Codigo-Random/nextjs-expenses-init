"use client";

import { Button, Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// Definir el esquema de validación con Zod
const formSchema = z.object({
  amount: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "La cantidad debe ser mayor que 0",
  }),
  type: z.enum(["gasto", "ingreso"], {
    required_error: "Selecciona un tipo",
  }),
  description: z.string().min(1, "La descripción es requerida"),
});

type FormData = z.infer<typeof formSchema>;

export default function AddExpenses() {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: "",
      type: undefined,
      description: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetch("/api/fake-expenses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: parseFloat(data.amount),
          type: data.type,
          description: data.description,
        }),
      });

      if (response.ok) {
        reset();
        alert("Datos guardados correctamente");
      }
    } catch (error) {
      console.error("Error al guardar:", error);
      alert("Error al guardar los datos");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Añadir Movimiento</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Controller
          name="amount"
          control={control}
          render={({ field }) => (
            <Input
              type="number"
              label="Cantidad (€)"
              placeholder="0.00"
              isInvalid={!!errors.amount}
              errorMessage={errors.amount?.message}
              {...field}
            />
          )}
        />

        <Controller
          name="type"
          control={control}
          render={({ field }) => (
            <Select
              label="Tipo"
              placeholder="Selecciona el tipo"
              selectedKeys={field.value ? [field.value] : []}
              onChange={(e) => field.onChange(e.target.value)}
              isInvalid={!!errors.type}
              errorMessage={errors.type?.message}
            >
              <SelectItem key="gasto" value="gasto">
                Gasto
              </SelectItem>
              <SelectItem key="ingreso" value="ingreso">
                Ingreso
              </SelectItem>
            </Select>
          )}
        />

        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <Textarea
              label="Descripción"
              placeholder="Describe el movimiento"
              isInvalid={!!errors.description}
              errorMessage={errors.description?.message}
              {...field}
            />
          )}
        />

        <Button type="submit" color="primary" className="w-full">
          Guardar
        </Button>
      </form>
    </div>
  );
}
