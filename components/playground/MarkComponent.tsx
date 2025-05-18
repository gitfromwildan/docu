type InsertAtCursor = (textArea: HTMLTextAreaElement, text: string) => void;

// ==============================================
// MARKDOWN COMPONENT HANDLERS
// ==============================================

/**
 * Handles inserting metadata block at cursor position
 */
export const handleMetadataClick = (insertAtCursor: InsertAtCursor) => {
  const textArea = document.querySelector("textarea");
  if (!textArea) return;
  
  const metadata = `---
title: Post Title
description: Your Post Description
date: ${new Date().toISOString().split("T")[0]}
image: example-img.png
---`;

  insertAtCursor(textArea, metadata);
};

/**
 * Handles inserting a paragraph with sample formatted text
 */
export const handleParagraphClick = (insertAtCursor: InsertAtCursor) => {
  const textArea = document.querySelector("textarea");
  if (!textArea) return;
  
  insertAtCursor(textArea, "This is regular text, **bold text**, *italic text*");
};

/**
 * Handles inserting a level 2 heading
 */
export const handleHeading2Click = (insertAtCursor: InsertAtCursor) => {
  const textArea = document.querySelector("textarea");
  if (!textArea) return;
  
  insertAtCursor(textArea, "## Heading 2");
};

/**
 * Handles inserting a level 3 heading
 */
export const handleHeading3Click = (insertAtCursor: InsertAtCursor) => {
  const textArea = document.querySelector("textarea");
  if (!textArea) return;
  
  insertAtCursor(textArea, "### Heading 3");
};

/**
 * Handles inserting a bullet list
 */
export const handleBulletListClick = (insertAtCursor: InsertAtCursor) => {
  const textArea = document.querySelector("textarea");
  if (!textArea) return;
  
  insertAtCursor(textArea, "- List item 1\n- List item 2\n- List item 3");
};

/**
 * Handles inserting a numbered list
 */
export const handleNumberedListClick = (insertAtCursor: InsertAtCursor) => {
  const textArea = document.querySelector("textarea");
  if (!textArea) return;
  
  insertAtCursor(textArea, "1. First item\n2. Second item\n3. Third item");
};

/**
 * Handles inserting a link
 */
export const handleLinkClick = (insertAtCursor: InsertAtCursor) => {
  const textArea = document.querySelector("textarea");
  if (!textArea) return;
  
  insertAtCursor(textArea, "[Link text](https://example.com)");
};

/**
 * Handles inserting an image
 */
export const handleImageClick = (insertAtCursor: InsertAtCursor) => {
  const textArea = document.querySelector("textarea");
  if (!textArea) return;
  
  insertAtCursor(textArea, "![Alt text](https://via.placeholder.com/150)");
};

/**
 * Handles inserting a blockquote
 */
export const handleBlockquoteClick = (insertAtCursor: InsertAtCursor) => {
  const textArea = document.querySelector("textarea");
  if (!textArea) return;
  
  insertAtCursor(textArea, "> The overriding design goal for Markdown's formatting syntax is to make it as readable as possible.");
};

/**
 * Handles inserting a code block with syntax highlighting
 */
export const handleCodeBlockClick = (insertAtCursor: InsertAtCursor) => {
  const textArea = document.querySelector("textarea");
  if (!textArea) return;
  
  const codeBlock = `\`\`\`javascript:main.js showLineNumbers {3-4}
function isRocketAboutToCrash() {
    // Check if the rocket is stable
    if (!isStable()) {
        NoCrash(); // Prevent the crash
    }
}
\`\`\``;
  
  insertAtCursor(textArea, codeBlock);
};

/**
 * Handles inserting a markdown table
 */
export const handleTableClick = (insertAtCursor: InsertAtCursor) => {
  const textArea = document.querySelector("textarea");
  if (!textArea) return;
  
  const table = `| Feature | Description |
|---------|-------------|
| MDX Support | Write interactive documentation with MDX |
| Nested Pages | Organize content hierarchically |
| Blog Section | Include a dedicated blog |
| Pagination | Split content across pages |`;
  
  insertAtCursor(textArea, table);
};

// ==============================================
// NOTE COMPONENT HANDLERS
// ==============================================

/**
 * Handles inserting a note component
 */
export const handleNoteClick = (insertAtCursor: InsertAtCursor, type: string) => {
  return () => {
    const textArea = document.querySelector("textarea");
    if (!textArea) return;
    
    const title = type.charAt(0).toUpperCase() + type.slice(1);
    const noteTemplate = `<Note type="${type}" title="${title}">
  This is a ${type} message.
</Note>`;
      
    insertAtCursor(textArea, noteTemplate);
  };
};

// ==============================================
// COMPONENT TEMPLATES
// ==============================================

/**
 * Handles inserting various component templates
 */
export const handleComponentClick = (insertAtCursor: InsertAtCursor, component: string) => {
  return () => {
    const textArea = document.querySelector("textarea");
    if (!textArea) return;

    // Component templates
    const templates: { [key: string]: string } = {
      // Stepper component
      stepper: `<Stepper>
  <StepperItem title="Step 1">
    Content for step 1
  </StepperItem>
  <StepperItem title="Step 2">
    Content for step 2
  </StepperItem>
</Stepper>`,

      // Card component
      card: `<Card 
  title="Card Title" 
  icon="Link" 
  href="/docs/example"
>
  This is a card component with an icon and link.
</Card>`,

      // Button component
      button: `<Button
  text="Click Me"
  href="#"
  icon="ArrowRight"
  size="md"
  variation="primary"
/>`,

      // Accordion component
      accordion: `<Accordion title="Accordion Title">
  This is the content inside the accordion.
  
  You can include:
  - Lists
  - **Bold** and *italic* text
  - [Links](#)
</Accordion>`,

      // YouTube component
      youtube: `<Youtube videoId="your-video-id" />`,

      // Tooltip component
      tooltip: `Hover over <Tooltip 
  text="this text" 
  tip="This is a helpful tooltip" 
/> to see a tooltip.`,

      // Tabs component
      tabs: `<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
  </TabsList>
  
  <TabsContent value="tab1">
    Content for tab 1
  </TabsContent>
  
  <TabsContent value="tab2">
    Content for tab 2
  </TabsContent>
</Tabs>`
    };

    const template = templates[component];
    if (template) {
      insertAtCursor(textArea, template);
    }
  };
};

// ==============================================
// SLASH COMMAND COMPONENTS
// ==============================================


/**
 * Array of markdown components available via slash command
 * Organized by category for better discoverability
 */
export const MARK_COMPONENTS = [
  // Document Structure
  { 
    label: "Metadata", 
    value: `---
title: Post Title
description: Your Post Description
date: ${new Date().toISOString().split("T")[0]}
image: example-img.png
---`,
    group: "Document" 
  },

  // Headings
  { 
    label: "Heading 2", 
    value: "## Heading 2",
    group: "Basic" 
  },
  { 
    label: "Heading 3", 
    value: "### Heading 3",
    group: "Basic" 
  },

  // Text Formatting
  { 
    label: "Paragraph", 
    value: "This is regular text, **bold text**, *italic text*",
    group: "Basic" 
  },
  { 
    label: "Blockquote", 
    value: "> The overriding design goal for Markdown's formatting syntax is to make it as readable as possible.",
    group: "Basic" 
  },

  // Lists
  { 
    label: "Bullet List", 
    value: "- First item\n- Second item\n- Third item",
    group: "Basic" 
  },
  { 
    label: "Numbered List", 
    value: "1. First item\n2. Second item\n3. Third item",
    group: "Basic" 
  },

  // Media
  { 
    label: "Link", 
    value: "[Link text](https://example.com)",
    group: "Media" 
  },
  { 
    label: "Image", 
    value: "![Alt text](https://via.placeholder.com/150)",
    group: "Media" 
  },

  // Code & Data
  { 
    label: "Code Block", 
    value: "```javascript:main.js showLineNumbers {3-4}\nfunction example() {\n    // Your code here\n    return 'Hello, world!';\n}\n```",
    group: "Code" 
  },
  { 
    label: "Table", 
    value: "| Header 1 | Header 2 |\n|----------|----------|\n| Cell 1   | Cell 2   |\n| Cell 3   | Cell 4   |",
    group: "Data" 
  },

  // DocuBook Components
  { 
    label: "Stepper", 
    value: `<Stepper>
  <StepperItem title="Step 1">
    Content for step 1
  </StepperItem>
  <StepperItem title="Step 2">
    Content for step 2
  </StepperItem>
</Stepper>`,
    group: "Components" 
  },
  { 
    label: "Button", 
    value: `<Button
  text="Click Me"
  href="#"
  icon="ArrowRight"
  size="md"
  variation="primary"
/>`,
    group: "Components"
  },
  { 
    label: "Accordion", 
    value: `<Accordion title="Markdown">
  This is an example of plain text content from the accordion component.
  
  You can include:
  - Lists
  - **Bold** and *italic* text
  - [Links](#)
</Accordion>`,
    group: "Components"
  },
  { 
    label: "YouTube", 
    value: `<Youtube videoId="your-video-id" />`,
    group: "Media"
  },
  { 
    label: "Tooltip", 
    value: `Hover over <Tooltip 
  text="this text" 
  tip="This is a helpful tooltip" 
/> to see a tooltip.`,
    group: "UI Components"
  },
  { 
    label: "Tabs", 
    value: `<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
  </TabsList>
  
  <TabsContent value="tab1">
    Content for tab 1
  </TabsContent>
  
  <TabsContent value="tab2">
    Content for tab 2
  </TabsContent>
</Tabs>`,
    group: "Layout"
  },
  { 
    label: "Note - Info", 
    value: `<Note type="info" title="Info">
  This is an informational note.
  You can add more details here.
</Note>`,
    group: "Components"
  },
  { 
    label: "Note - Danger", 
    value: `<Note type="danger" title="Danger">
  This is a warning about a potentially dangerous action.
  Be careful!
</Note>`,
    group: "Components"
  },
  { 
    label: "Note - Warning", 
    value: `<Note type="warning" title="Warning">
  This is a warning message.
  Please pay attention to this.
</Note>`,
    group: "Components"
  },
  { 
    label: "Note - Success", 
    value: `<Note type="success" title="Success">
  Your action was completed successfully!
</Note>`,
    group: "Components"
  },
  { 
    label: "Note - Tip", 
    value: `<Note type="tip" title="Pro Tip">
  Here's a helpful tip to improve your workflow.
  Try it out!
</Note>`,
    group: "Components"
  }
];

// Sort components by group for better organization in the UI
export const sortedMARK_COMPONENTS = MARK_COMPONENTS.sort((a, b) => {
  if (a.group < b.group) return -1;
  if (a.group > b.group) return 1;
  return a.label.localeCompare(b.label);
});
