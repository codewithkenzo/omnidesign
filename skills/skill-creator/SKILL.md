---
name: skill-creator
description: Create professional skill repositories and projects for AI coding assistants. Use when asked to create a skill, build an agent skill, scaffold a skill project, or package expertise for AI assistants. Supports any domain - frontend, backend, DevOps, data science, legal, medical, etc.
license: MIT
metadata:
  author: codewithkenzo
  version: "1.0.0"
  category: meta-skill
---

# Skill Creator

Create production-ready skill repositories that work across 10+ AI coding assistants.

## When to Use

- "Create a skill for X"
- "Build an agent skill"
- "Scaffold a skill project"
- "Package my expertise for AI"
- "Make a skill like OmniDesign"
- "Create IDE plugins/skills"

## Overview

This skill creates complete skill repositories following the [Agent Skills](https://agentskills.io/) open standard. Generated skills work with:

- Claude Code
- Cursor
- OpenCode
- VS Code
- Zed
- Amp Code
- Kilo Code
- Antigravity
- Aider
- Continue.dev

## Workflow

### Phase 1: Research & Discovery

Before writing any code, research:

1. **Domain Analysis**
   - What expertise are we packaging?
   - Who is the target user?
   - What problems does this solve?

2. **IDE Ecosystem Research**
   - Which IDEs support skills in this domain?
   - What formats do they use?
   - Where do skills get installed?

3. **Existing Skills Review**
   - Search GitHub for similar skills
   - Analyze vercel-labs/agent-skills
   - Check anthropics/skills

4. **Trigger Phrases**
   - What will users say to activate this skill?
   - Examples: "Deploy my app", "Review React performance", "Analyze this dataset"

### Phase 2: Architecture Design

Design the skill structure:

```
{skill-name}/
├── README.md              # Public documentation
├── package.json          # If CLI needed
├── AGENTS.md            # Agent guidance
├── bin/                 # CLI tools (optional)
├── skills/              # IDE-specific skills
│   ├── claude/SKILL.md
│   ├── cursor/SKILL.md
│   ├── opencode/SKILL.md
│   └── ...
├── references/          # Domain knowledge
│   ├── patterns.md
│   ├── best-practices.md
│   └── examples/
├── scripts/             # Automation scripts
└── assets/              # Images, templates
```

### Phase 3: SKILL.md Creation

Create the main skill definition:

```markdown
---
name: {skill-name}
description: {Clear description with trigger phrases}
---

# {Title}

## When to Use

{Specific trigger conditions}

## Capabilities

- {Capability 1}
- {Capability 2}

## Usage

### Example 1
```
User: "{Example prompt}"
AI: [Uses skill to help]
```

## Reference

- [Patterns](references/patterns.md)
- [Examples](references/examples/)
```

### Phase 4: Multi-IDE Support

Create IDE-specific variants:

**Claude Code:**
- Location: `skills/claude/`
- Format: Markdown with frontmatter
- Config: `marketplace.json`

**Cursor:**
- Location: `skills/cursor/`
- Format: Markdown

**OpenCode:**
- Location: `skills/opencode/`
- Format: Markdown
- Config: `config.json` plugins array

**VS Code:**
- Location: `skills/vscode/`
- Format: `package.json` contribution

**Aider:**
- Location: `skills/aider/`
- Format: `CONVENTIONS.md`

### Phase 5: CLI Installer (Optional)

If the skill needs complex installation, create a CLI:

```javascript
#!/usr/bin/env node
import { program } from 'commander';

program
  .name('{skill-name}')
  .description('{Skill description}')
  .version('1.0.0');

program
  .command('install')
  .option('-i, --ide <ide>', 'Target IDE')
  .option('-g, --global', 'Install globally')
  .action(async (options) => {
    // Install logic
  });

program.parse();
```

### Phase 6: Documentation

Create comprehensive docs:

1. **README.md**: Public-facing, badges, install instructions
2. **AGENTS.md**: Internal guidance for AI agents
3. **references/**: Detailed domain knowledge
4. **examples/**: Working examples

### Phase 7: Testing & Publishing

Test install/uninstall for each IDE:

```bash
# Test Claude Code
npx {skill-name} install --ide claude --global
npx {skill-name} uninstall --ide claude --global

# Test all IDEs
npx {skill-name} list --global
```

Publish to NPM:

```bash
npm version patch
npm publish --access public
```

## Skill Templates

### Template: Domain Expertise

For packaging specialized knowledge (legal, medical, finance):

```markdown
---
name: legal-contract-review
description: Review contracts for common issues, risky clauses, and compliance. Use when asked to review contracts, check legal documents, or identify contract risks.
---

# Legal Contract Review

## When to Use

- Reviewing contracts before signing
- Identifying risky clauses
- Checking compliance requirements
- Comparing contract versions

## Review Checklist

### Critical Issues
- [ ] Unlimited liability clauses
- [ ] Unclear termination conditions
- [ ] Missing dispute resolution
- [ ] Unreasonable non-compete terms

### Standard Clauses
- [ ] Payment terms clearly defined
- [ ] Deliverables specified
- [ ] Timeline with milestones
- [ ] IP ownership clarified

## Output Format

```
## Contract Review Summary

**Overall Risk:** {Low|Medium|High}

**Critical Issues:** {N} found
**Warnings:** {N} found
**Suggestions:** {N}

### Action Items
1. {Specific action}
2. {Specific action}
```

## Reference

- [Contract Types](references/contract-types.md)
- [Red Flags Guide](references/red-flags.md)
```

### Template: Tool Integration

For skills that integrate with external tools (AWS, Docker, Vercel):

```markdown
---
name: aws-deploy
description: Deploy applications to AWS. Use when asked to deploy to AWS, setup EC2, configure S3, or manage AWS resources.
---

# AWS Deploy

## Prerequisites

- AWS CLI configured
- Appropriate IAM permissions
- Docker (for containerized deploys)

## Commands

### Deploy to EC2
```bash
bash scripts/deploy-ec2.sh [options]
```

**Options:**
- `--env` - Environment (dev|staging|prod)
- `--type` - Instance type (t3.micro, etc.)

### Deploy to S3
```bash
bash scripts/deploy-s3.sh [bucket-name]
```

## Output

```
Deployment successful!

URL: https://...
Region: us-east-1
Resources: [list]
```
```

### Template: Code Review

For skills that review code for patterns/issues:

```markdown
---
name: security-audit
description: Audit code for security vulnerabilities. Use when asked to review security, check for vulnerabilities, audit code safety, or identify security issues.
---

# Security Audit

## Audit Categories

### Authentication
- Hardcoded credentials
- Weak password policies
- Missing MFA
- Session management issues

### Data Handling
- SQL injection risks
- XSS vulnerabilities
- Unsanitized inputs
- Sensitive data exposure

### Infrastructure
- Exposed ports
- Missing encryption
- Weak TLS configuration
- Overly permissive IAM

## Output Format

```
## Security Audit Results

**Risk Level:** {Critical|High|Medium|Low}

**Critical:** {N} issues
**High:** {N} issues
**Medium:** {N} issues
**Low:** {N} issues

### Critical Issues
1. **{Issue Name}** - {Location}
   - {Description}
   - **Fix:** {Recommendation}
```
```

## Best Practices

### Context Efficiency

- Keep SKILL.md under 500 lines
- Use progressive disclosure
- Reference external files for details
- Put scripts in `scripts/` directory

### Trigger Phrases

Include specific phrases in description:
- "Use when asked to..."
- "Activate when user mentions..."
- "Helpful for..."

Examples:
- "Deploy my app"
- "Review React performance"
- "Check accessibility"
- "Analyze this dataset"

### Cross-IDE Compatibility

- Use relative paths: `./scripts/deploy.sh`
- Avoid IDE-specific syntax
- Test on all target IDEs
- Document IDE-specific quirks

### Documentation Quality

- Clear, actionable instructions
- Working examples
- Troubleshooting section
- Output format templates

## Common Patterns

### Pattern: Progressive Disclosure

```markdown
# Main SKILL.md (loaded on activation)

## Quick Reference

Brief overview...

## Detailed Guide

See [references/DETAILED.md](references/DETAILED.md)

## Examples

See [references/examples/](references/examples/)
```

### Pattern: Script-Based Actions

```markdown
## Deploy

```bash
bash scripts/deploy.sh --env production
```

**Script Location:** `scripts/deploy.sh`
```

### Pattern: Conditional Logic

```markdown
## Usage

If user mentions "quick deploy":
- Use default settings
- Skip confirmation

If user mentions "production":
- Confirm before deploying
- Run full test suite
- Enable monitoring
```

## Reference

- [Agent Skills Spec](https://agentskills.io/specification)
- [Vercel Agent Skills](https://github.com/vercel-labs/agent-skills)
- [Anthropic Skills](https://github.com/anthropics/skills)
- [OmniDesign Architecture](AGENTS.md)

## Examples

See `references/examples/` for complete skill examples:

- `frontend-arsenal/` - Design system skill
- `backend-patterns/` - API development skill
- `devops-toolkit/` - Infrastructure skill
- `data-analysis/` - Data science skill
