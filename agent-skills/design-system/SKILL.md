# Untitled UI Design System Documentation

## 📐 Overview

This document outlines the design tokens and components based on the **Untitled UI** design system style. It focuses on a clean, utility-first SaaS aesthetic with precise typography, subtle shadows, and a highly accessible color palette.

---

## 🎨 Colors

### Primary Palette (Untitled Purple)
| Token | Value | Usage |
|-------|-------|-------|
| `--color-primary-purple` | `#7F56D9` | Primary action color, CTAs, links |
| `--color-purple-50` | `#F9F5FF` | Soft backgrounds for active states/badges |
| `--color-purple-100` | `#F4EBFF` | Slightly darker active backgrounds |
| `--color-purple-700` | `#6941C6` | Text inside purple badges |

### Neutral Palette (Grays)
| Token | Value | Usage |
|-------|-------|-------|
| `--color-gray-25` | `#FCFCFD` | Extremely subtle table backgrounds |
| `--color-gray-50` | `#F9FAFB` | App background, table headers |
| `--color-gray-100` | `#F2F4F7` | Body background, hover states |
| `--color-gray-200` | `#EAECF0` | Dividers, subtle borders |
| `--color-gray-300` | `#D0D5DD` | Input borders, button borders |
| `--color-gray-400` | `#98A2B3` | Icons |
| `--color-gray-500` | `#667085` | Secondary text, descriptions |
| `--color-gray-600` | `#475467` | Muted primary text, table content |
| `--color-gray-700` | `#344054` | Button text, secondary headings |
| `--color-gray-900` | `#101828` | Primary text, main headings |

### Semantic Palette
| Token | Value | Usage |
|-------|-------|-------|
| `--color-success-50` | `#ECFDF3` | Success badge background |
| `--color-success-500` | `#12B76A` | Success dot indicator |
| `--color-success-700` | `#027A48` | Success badge text |

---

## 🔤 Typography

- **Font Family**: `Inter, sans-serif`
- **Primary Text**: `text-[14px]` (Table content, inputs, descriptions)
- **Secondary Text**: `text-[12px]` (Badges, subtext, table headers)
- **Headings**: 
  - Page Title: `text-[30px] font-semibold text-[--color-gray-900]`
  - Section Title: `text-[18px] font-semibold text-[--color-gray-900]`
- **Weights**: Regular (400), Medium (500), Semibold (600)

---

## 📏 Shadows & Effects

Untitled UI relies heavily on highly refined box shadows to create depth without dark lines.

| Token | CSS Value | Usage |
|-------|-----------|-------|
| `--shadow-xs` | `0px 1px 2px rgba(16, 24, 40, 0.05)` | Buttons, inputs, small badges |
| `--shadow-sm` | `0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06)` | Cards, table wrappers, modals |
| `--shadow-md` | `0px 4px 8px -2px rgba(16, 24, 40, 0.1)` | Hover states for cards |

---

## 🧱 Components

### Badges
Badges are used extensively for status and tags.
- **Base Style**: `inline-flex items-center gap-[6px] px-[8px] py-[2px] rounded-full text-[12px] font-medium`
- **Success State**: `bg-[var(--color-success-50)] text-[var(--color-success-700)]`
- **Purple State**: `bg-[var(--color-purple-50)] text-[var(--color-purple-700)]`

### Inputs & Checkboxes
- **Input Field**: `border border-[var(--color-gray-300)] rounded-[8px] shadow-[var(--shadow-xs)]`
- **Focus State**: `focus:border-[var(--color-primary-purple)] focus:ring-4 focus:ring-[var(--color-purple-50)]`
- **Checkbox**: `w-[16px] h-[16px] rounded-[4px] border-[var(--color-gray-300)] text-[var(--color-primary-purple)]`

### Buttons
- **Secondary Button**: `bg-white border border-[var(--color-gray-300)] text-[var(--color-gray-700)] shadow-[var(--shadow-xs)]`
- **Primary Button**: `bg-[var(--color-primary-purple)] border-[var(--color-primary-purple)] text-white shadow-[var(--shadow-xs)]`

---

## 📐 Layout & Spacing
- **Container Width**: Max-width of `1440px`.
- **Radii**: 
  - Buttons/Inputs: `rounded-[8px]` (md)
  - Cards/Tables: `rounded-[12px]` (xl)
- **Table Padding**: `px-[24px] py-[16px]` for rows, `py-[12px]` for headers.
