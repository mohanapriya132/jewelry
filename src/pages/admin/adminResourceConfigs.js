export const orderFields = [
  { key: "customer", label: "Customer", required: true },
  { key: "email", label: "Email", type: "email", required: true },
  { key: "items", label: "Items", required: true },
  { key: "total", label: "Total", required: true },
  { key: "date", label: "Date", required: true },
  {
    key: "status",
    label: "Status",
    type: "select",
    defaultValue: "Pending",
    options: ["Pending", "Processing", "Shipped", "Delivered"],
    required: true,
  },
];

export const customerFields = [
  { key: "name", label: "Name", required: true },
  { key: "email", label: "Email", type: "email", required: true },
  { key: "phone", label: "Phone", required: true },
  { key: "orders", label: "Orders", type: "number", defaultValue: 0, required: true },
  { key: "spent", label: "Total Spent", defaultValue: "Rs 0", required: true },
  { key: "joined", label: "Joined", required: true },
];

export const reviewFields = [
  { key: "product", label: "Product", required: true },
  { key: "customer", label: "Customer", required: true },
  { key: "date", label: "Date", required: true },
  { key: "rating", label: "Rating", type: "number", defaultValue: 5, required: true },
  {
    key: "status",
    label: "Status",
    type: "select",
    defaultValue: "Pending",
    options: ["Pending", "Approved", "Rejected"],
    required: true,
  },
  { key: "comment", label: "Comment", type: "textarea", required: true },
];

export const contentResourceConfigs = {
  categories: {
    table: "categories",
    title: "Categories",
    singular: "Category",
    countLabel: "categories",
    titleKey: "title",
    fields: [
      { key: "title", label: "Title", required: true },
      { key: "subtitle", label: "Subtitle", required: true },
      { key: "image", label: "Image", type: "image", required: true },
      { key: "count", label: "Count Label", required: true },
    ],
    columns: [
      { key: "title", label: "Title" },
      { key: "subtitle", label: "Subtitle" },
      { key: "count", label: "Count" },
    ],
  },
  offers: {
    table: "offers",
    title: "Offers",
    singular: "Offer",
    countLabel: "offers",
    titleKey: "title",
    fields: [
      { key: "title", label: "Title", required: true },
      { key: "off", label: "Offer Text", required: true },
      { key: "img", label: "Image", type: "image", required: true },
    ],
    columns: [
      { key: "title", label: "Title" },
      { key: "off", label: "Offer" },
      { key: "img", label: "Image" },
    ],
  },
  features: {
    table: "features",
    title: "Feature Strip",
    singular: "Feature",
    countLabel: "features",
    titleKey: "label",
    fields: [
      { key: "icon", label: "Icon", required: true },
      { key: "label", label: "Label", required: true },
      { key: "sub", label: "Subtitle", required: true },
    ],
    columns: [
      { key: "icon", label: "Icon" },
      { key: "label", label: "Label" },
      { key: "sub", label: "Subtitle" },
    ],
  },
  weddingTabs: {
    table: "wedding_tabs",
    title: "Wedding Tabs",
    singular: "Wedding Tab",
    countLabel: "tabs",
    titleKey: "label",
    fields: [
      { key: "id", label: "Tab ID", required: true, readOnlyOnEdit: true },
      { key: "label", label: "Label", required: true },
      { key: "count", label: "Count", required: true },
    ],
    columns: [
      { key: "id", label: "ID" },
      { key: "label", label: "Label" },
      { key: "count", label: "Count" },
    ],
  },
  weddingProducts: {
    table: "wedding_products",
    title: "Wedding Products",
    singular: "Wedding Product",
    countLabel: "wedding products",
    titleKey: "name",
    fields: [
      { key: "name", label: "Name", required: true },
      { key: "sub", label: "Subtitle", required: true },
      { key: "tab_id", label: "Tab ID", defaultValue: "engagement", required: true },
      { key: "carats", label: "Carats", required: true },
      { key: "metal", label: "Metal", required: true },
      { key: "rating", label: "Rating", type: "number", defaultValue: 5, required: true },
      { key: "reviews", label: "Reviews", type: "number", defaultValue: 0, required: true },
      { key: "price", label: "Price", required: true },
      { key: "orig", label: "Original Price", nullable: true },
      {
        key: "badge",
        label: "Badge",
        type: "select",
        defaultValue: "New",
        options: ["Bestseller", "New", "Sale", "Exclusive"],
        required: true,
      },
      { key: "image", label: "Image", type: "image", required: true },
    ],
    columns: [
      { key: "name", label: "Name" },
      { key: "tab_id", label: "Tab" },
      { key: "price", label: "Price" },
      { key: "badge", label: "Badge" },
    ],
  },
  weddingPromises: {
    table: "wedding_promises",
    title: "Wedding Promises",
    singular: "Wedding Promise",
    countLabel: "promises",
    titleKey: "title",
    fields: [
      { key: "title", label: "Title", required: true },
      { key: "desc_text", label: "Description", type: "textarea", required: true },
      { key: "icon_path", label: "SVG Icon Path", type: "textarea", required: true },
    ],
    columns: [
      { key: "title", label: "Title" },
      { key: "desc_text", label: "Description" },
    ],
  },
};
