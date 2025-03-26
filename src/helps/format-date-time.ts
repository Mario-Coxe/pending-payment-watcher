import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export function formatDateTime(data: Date): string {
  return format(data, "dd/MM/yyyy HH:mm:ss", { locale: ptBR });
}

export function formatRemainingTime(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
}
