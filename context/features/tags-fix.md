# Seed Data Specification

## Overview

Update a seed script (`prisma/seed.ts`) to populate tag and TagsOnItem tables

## Requirements

- Relation Many to Many for tags and items
- tag schema -> id, name
- item schema -> as it is
- tagitem -> tagId, itemId
- populate tags table according model Tag `@prisma/schema.prisma`
- populate TagItem table (itemId, tagId) database already has Items table
- update `prisma/seed.ts`
- create migration
