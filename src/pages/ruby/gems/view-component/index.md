---
layout: ~/layouts/BaseLayout.astro
title: View Component
# pageTitle: Factory Bot - Guide | AppyDave
# description:
---

## Overview

A framework for building reusable, testable & encapsulated view components in Ruby on Rails.

Use view_component to DRY up views via a reusable component oriented system.

- [Gem](https://github.com/viewcomponent/view_component)
- [Site](https://viewcomponent.org/)
- [Article](https://dev.to/nejremeslnici/from-partials-to-viewcomponents-writing-reusable-front-end-code-in-rails-1c9o)

## Goal: Clean up three partials

The three modal dialog partials are exactly the same accept for the tile and the data endpoint

### Company modal

```html
<div class="modal-header">
  <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>
  <h4 class="modal-title text-left"><%= t("manage_tags_for", name: @company.name ) %> </h4>
</div>
<div class="modal-body">

  <span id="tag_manager">
    <%# LOADER WILL BE REMOVED ONCE TAGS ARE LOADED FROM JS %>
    <div class="text-center p-a-3">
      <svg class="spinner" width="40px" height="40px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
        <circle class="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle>
      </svg>
    </div>
  </span>  
</div>
<div class="modal-footer text-right">
  <button class="btn btn-default" data-dismiss="modal"><%= t("close") %></button>
</div>

<style>
  #tag_manager .label { margin-bottom:5px; }
</style>
<script>
  $.get('/tags/manage?context_id=<%= @company.id %>&context_type=Company');

  $('#ajaxModal').on('hide.bs.modal', function () {
    location.reload();
  });
</script>
```

### Contact modal

```html
<div class="modal-header">
  <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>
  <h4 class="modal-title text-left"><%= t("manage_tags_for", name: @contact.name ) %> </h4>
</div>
<div class="modal-body">

  <span id="tag_manager">
    <%# LOADER WILL BE REMOVED ONCE TAGS ARE LOADED FROM JS %>
    <div class="text-center p-a-3">
      <svg class="spinner" width="40px" height="40px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
        <circle class="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle>
      </svg>
    </div>
  </span>  
</div>
<div class="modal-footer text-right">
  <button class="btn btn-default" data-dismiss="modal"><%= t("close") %></button>
</div>

<style>
  #tag_manager .label { margin-bottom:5px; }
</style>
<script>
  $.get('/tags/manage?context_id=<%= @contact.id %>&context_type=Contact');

  $('#ajaxModal').on('hide.bs.modal', function () {
    location.reload();
  });
</script>
```

### Inquiry modal

```html
<div class="modal-header">
  <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>
  <h4 class="modal-title text-left"><%= t("manage_tags_for", name: @inquiry.name ) %> </h4>
</div>
<div class="modal-body">

  <span id="tag_manager">
    <%# LOADER WILL BE REMOVED ONCE TAGS ARE LOADED FROM JS %>
    <div class="text-center p-a-3">
      <svg class="spinner" width="40px" height="40px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
        <circle class="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle>
      </svg>
    </div>
  </span>  
</div>
<div class="modal-footer text-right">
  <button class="btn btn-default" data-dismiss="modal"><%= t("close") %></button>
</div>

<style>
  #tag_manager .label { margin-bottom:5px; }
</style>
<script>
  $.get('/tags/manage?context_id=<%= @inquiry.id %>&context_type=Inquiry');

  $('#ajaxModal').on('hide.bs.modal', function () {
    location.reload();
  });
</script>
```

### Differences

```html
  <h4 class="modal-title text-left"><%= t("manage_tags_for", name: @company.name ) %> </h4>
  <h4 class="modal-title text-left"><%= t("manage_tags_for", name: @contact.name ) %> </h4>
  <h4 class="modal-title text-left"><%= t("manage_tags_for", name: @inquiry.name ) %> </h4>
```

```javascript
$.get('/tags/manage?context_id=<%= @company.id %>&context_type=Company');
$.get('/tags/manage?context_id=<%= @contact.id %>&context_type=Contact');
$.get('/tags/manage?context_id=<%= @inquiry.id %>&context_type=Inquiry');
```
