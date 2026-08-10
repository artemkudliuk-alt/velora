import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = process.cwd();

const body = `
# Browser Use

Direct browser control via CDP for web interaction: automation, scraping, testing, screenshots, and site/app work.

Target: {{args}}

Use browser automation tools (puppeteer / chrome) to navigate to {{args}}, interact with elements, inspect page content, and take screenshots.
`;

const shortDesc = "Direct browser control via CDP for web interaction and automation";

function write(relPath, content) {
  const full = join(ROOT, relPath);
  mkdirSync(join(ROOT, relPath, '..'), { recursive: true });
  writeFileSync(full, content, 'utf8');
  console.log(`✓ ${relPath}`);
}

const rawSkill = `---
name: browser-use
description: "${shortDesc}"
argument-hint: "<url or action>"
user-invocable: true
---
${body}
`;

console.log('Registering browser-use across all IDE platforms...');

write('.claude/skills/browser-use/SKILL.md', rawSkill);
write('.codex/skills/browser-use/SKILL.md', rawSkill);
write('.github/skills/browser-use/SKILL.md', rawSkill);
write('.cursor/commands/browser-use.md', body);
write('.windsurf/workflows/browser-use.md', body);
write('.gemini/commands/browser-use.toml',
  `description = "${shortDesc}"\nname = "browser-use"\n\nprompt = '''\n${body}\n'''\n`
);
write('.opencode/commands/browser-use.md', `---\ndescription: "${shortDesc}"\n---\n${body}`);
write('.augment/commands/browser-use.md', `---\ndescription: "${shortDesc}"\nargument-hint: "<url>"\n---\n${body}`);
write('.continue/commands/browser-use.md', `---\nname: browser-use\ndescription: "${shortDesc}"\ninvokable: true\n---\n${body}`);

console.log('All IDE platform command files generated for /browser-use!');
