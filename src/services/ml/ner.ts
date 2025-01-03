// Simple Named Entity Recognition implementation
interface Entity {
  text: string;
  type: 'PERSON' | 'ORG' | 'LOC' | 'EVENT';
  index: number;
}

// Common entity patterns
const ENTITY_PATTERNS = {
  PERSON: /(?:[A-Z][a-z]+(?:\s+[A-Z][a-z]+)+)/g,
  ORG: /(?:[A-Z][A-Z]+(?:\s+[A-Z]+)*)|(?:(?:The\s+)?[A-Z][a-z]+\s+(?:Organization|Association|Committee|Commission|Agency|Department|Institute|University|Company|Corporation|Inc\.|Ltd\.))/g,
  LOC: /(?:[A-Z][a-z]+(?:\s+[A-Z][a-z]+)*(?:\s+(?:City|State|Country|Island|Mountain|River|Ocean|Sea))?)/g,
  EVENT: /(?:(?:The\s+)?[A-Z][a-z]+(?:\s+[A-Z][a-z]+)*(?:\s+(?:Summit|Conference|Meeting|Election|Games|Championship|Festival|Award|Ceremony|Crisis))?)/g
};

export function extractNamedEntities(text: string): Entity[] {
  const entities: Entity[] = [];
  
  Object.entries(ENTITY_PATTERNS).forEach(([type, pattern]) => {
    let match;
    while ((match = pattern.exec(text)) !== null) {
      // Validate entity
      const entity = match[0].trim();
      if (entity.length > 2 && !isStopWord(entity)) {
        entities.push({
          text: entity,
          type: type as Entity['type'],
          index: match.index
        });
      }
    }
  });

  // Remove duplicates and overlapping entities
  return removeDuplicateEntities(entities);
}

function isStopWord(text: string): boolean {
  const commonWords = new Set([
    'The', 'This', 'That', 'These', 'Those', 'Here', 'There',
    'Today', 'Tomorrow', 'Yesterday', 'Now', 'Then'
  ]);
  return commonWords.has(text);
}

function removeDuplicateEntities(entities: Entity[]): Entity[] {
  // Sort by index to handle overlaps
  const sorted = [...entities].sort((a, b) => a.index - b.index);
  const filtered: Entity[] = [];
  let lastEnd = -1;

  for (const entity of sorted) {
    const start = entity.index;
    const end = start + entity.text.length;

    // Check for overlap with previous entity
    if (start >= lastEnd) {
      filtered.push(entity);
      lastEnd = end;
    }
  }

  return filtered;
}