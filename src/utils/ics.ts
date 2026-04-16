import { CmsBlock, CmsColumns, CmsEvent, CmsText } from "../types/cms";

function pad(n: number): string {
  return n.toString().padStart(2, "0");
}

function toIcsLocal(d: Date): string {
  return (
    d.getFullYear().toString() +
    pad(d.getMonth() + 1) +
    pad(d.getDate()) +
    "T" +
    pad(d.getHours()) +
    pad(d.getMinutes()) +
    "00"
  );
}

function extractText(blocks: CmsBlock[]): string {
  const lines: string[] = [];
  for (const block of blocks) {
    if (block.type === "text") {
      lines.push((block as CmsText).body);
    } else if (block.type === "columns") {
      const col = block as CmsColumns;
      for (const b of [...col.left, ...col.right]) {
        if (b.type === "text") lines.push((b as CmsText).body);
      }
    }
  }
  return lines.join("\n");
}

function foldLine(line: string): string {
  // RFC 5545: max 75 octets per line, continuation lines start with a space
  const out: string[] = [];
  while (line.length > 75) {
    out.push(line.slice(0, 75));
    line = " " + line.slice(75);
  }
  out.push(line);
  return out.join("\r\n");
}

function escape(s: string): string {
  return s.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");
}

export function generateIcs(event: CmsEvent): string {
  const start = new Date(event.date);
  const end = event.endDate
    ? new Date(event.endDate)
    : new Date(start.getTime() + 2 * 60 * 60 * 1000);

  const description = escape(extractText(event.body));
  const uid = `${event.slug}@vinkolsbygdegard.se`;

  const rawLines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Vinköls Bygdegård//vinkolsbygdegard.se//SV",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTART;TZID=Europe/Stockholm:${toIcsLocal(start)}`,
    `DTEND;TZID=Europe/Stockholm:${toIcsLocal(end)}`,
    `SUMMARY:${escape(event.title)}`,
    description ? `DESCRIPTION:${description}` : null,
    "END:VEVENT",
    "END:VCALENDAR",
  ];

  return rawLines
    .filter((l): l is string => l !== null)
    .map(foldLine)
    .join("\r\n");
}

export function icsDataUrl(event: CmsEvent): string {
  const content = generateIcs(event);
  return `data:text/calendar;charset=utf-8,${encodeURIComponent(content)}`;
}
