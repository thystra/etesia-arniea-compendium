# Releasing the Etesia–Arniea Compendium

The workflow at `.github/workflows/release.yml` builds the source compendium packs, creates a release-specific `module.json`, creates the Foundry installation ZIP, and attaches both files to a GitHub release.

## First-time setup

Commit and push the workflow to the default branch **before** creating the first release tag.

If the release step reports `403 Resource not accessible by integration`, open:

**Repository Settings → Actions → General → Workflow permissions**

and allow **Read and write permissions** for the repository workflow token.

## Publish a release

From a clean checkout on the commit you want to release:

```bash
git tag v0.1.0
git push origin v0.1.0
```

Tags must begin with `v`. The version written into the release manifest is the tag without that leading `v`.

The action publishes:

- `module.json`
- `etesia-arniea-compendium-v0.1.0.zip`
- `SHA256SUMS.txt`

Use this stable manifest URL in Foundry:

```text
https://github.com/thystra/etesia-arniea-compendium/releases/latest/download/module.json
```

## Manual build test

Open **Actions → Build and publish Foundry module → Run workflow** and enter a version. A manual run builds and validates the files and makes them available as workflow artifacts, but it does not create a GitHub release.
