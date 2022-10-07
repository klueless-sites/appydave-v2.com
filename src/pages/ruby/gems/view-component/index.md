---
layout: ~/layouts/BaseLayout.astro
title: View Component
---

## Overview

A framework for building reusable, testable & encapsulated view components in Ruby on Rails.

Use view_component to DRY up views via a reusable component oriented system.

- [Gem](https://github.com/viewcomponent/view_component)
- [Site](https://viewcomponent.org/)
- [Article](https://dev.to/nejremeslnici/from-partials-to-viewcomponents-writing-reusable-front-end-code-in-rails-1c9o)

You can also browse, develop, test & document ViewComponents using [Lookbook](https://lookbook.build/guide/)

## Goal: Clean up three partials

![](https://t6925357.p.clickup-attachments.com/t6925357/bcb3c7b3-9293-405c-8153-8b89bc2ea940/image.png)

The three modal dialog partials are exactly the same accept for the tile and the data endpoint

### Company modal

Update tags via modal dialog for companies

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

Update tags via modal dialog for contacts

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

Update tags via modal dialog for inquiries

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

## Rewrite using ViewComponent

### Component Logic

```ruby
# app/components/update_tags_modal_component.rb
class UpdateTagsModalComponent < ViewComponent::Base
  def initialize(name:, id:, context_type:)
    @name = name
    @id = id
    @context_type = context_type
  end
end
```


### Component HTML

```erb
<%# app/components/update_tags_component.html.erb %>

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
  $.get('/tags/manage?context_id=<%= @id %>&context_type=<%= @context_type %>');

  $('#ajaxModal').on('hide.bs.modal', function () {
    location.reload();
  });
</script>
```

### Component Usage

```erb
<%# app/views/companies/update_tags_modal.html.erb %>
<%= render(UpdateTagsModalComponent.new(name: @company.name, id: @company.id, context_type: 'Company')) %>
```

## Lookbook

A tool to help browse, develop, test & document ViewComponents in Ruby on Rails apps.

Like Storybook, Lookbook is a frontend workshop for building UI components and pages in isolation. 

- [Lookbook Demo](https://lookbook.build/guide/)
- [Lookbook Gem](https://github.com/allmarkedup/lookbook)

![](https://github.com/allmarkedup/lookbook/raw/main/.github/assets/lookbook_screenshot_v1.0_beta.png)

## Pricing Chart (Partials)

### Pricing chart using partials

```erb
<div class="border-b border-gray-200 py-5">
  <h3 class="text-lg font-medium leading-6 text-gray-900">Partials</h3>
  <p class="mt-2 max-w-4xl text-sm text-gray-500">Use Rails Partials to hold the HTML</p>
</div>

<%= render 'price_container' %>
```

### Pricing container partial

```erb
<div class="bg-white">
  <div class="mx-auto max-w-7xl py-24 px-4 sm:px-6 lg:px-8">
    <div class="sm:align-center sm:flex sm:flex-col">
      <h1 class="text-5xl font-bold tracking-tight text-gray-900 sm:text-center">Pricing Plans</h1>
    </div>
    <div class="mt-12 space-y-4 sm:mt-16 sm:grid sm:grid-cols-2 sm:gap-6 sm:space-y-0 lg:mx-auto lg:max-w-4xl xl:mx-0 xl:max-w-none xl:grid-cols-4">
      <%= render 'price_card', locals: { price: '$12', heading: 'Hoby', description: 'All the basics for having fun and make a few bucks', items: ['Potenti felis, in cras at at ligula nunc.', 'Orci neque eget pellentesque.'] } %>
      <%= render 'price_card', locals: { price: '$24', heading: 'Freelancer', description: 'All the basics for starting a new business', items: ['Potenti felis, in cras at at ligula nunc.', 'Orci neque eget pellentesque.', 'Donec mauris sit in eu tincidunt etiam.'] } %>
      <%= render 'price_card', locals: { price: '$32', heading: 'Startup', description: 'What you need to starting building an empire', items: ['Potenti felis, in cras at at ligula nunc.', 'Orci neque eget pellentesque.', 'Donec mauris sit in eu tincidunt etiam.', 'Faucibus volutpat magna.'] } %>
      <%= render 'price_card', locals: { price: '$48', heading: 'Enterprise', description: 'Scalability and reliablity for your business', items: ['Potenti felis, in cras at at ligula nunc.', 'Orci neque eget pellentesque.', 'Donec mauris sit in eu tincidunt etiam.', 'Faucibus volutpat magna.', 'Id sed tellus in varius quisque.', 'Risus egestas faucibus.', 'Risus cursus ullamcorper.'] } %>
    </div>
  </div>
</div>
```

### Pricing card partial

```erb
<div class="divide-y divide-gray-200 rounded-lg border border-gray-200 shadow-sm">
  <div class="p-6">
    <h2 class="text-lg font-medium leading-6 text-gray-900"><%= locals[:heading] %></h2>
    <p class="mt-4 text-sm text-gray-500"><%= locals[:description] %></p>
    <p class="mt-8">
      <span class="text-4xl font-bold tracking-tight text-gray-900"><%=locals[:price] %></span>
      <span class="text-base font-medium text-gray-500">/mo</span>
    </p>
    <a href="#" class="mt-8 block w-full rounded-md border border-gray-800 bg-gray-800 py-2 text-center text-sm font-semibold text-white hover:bg-gray-900">Buy Hobby</a>
  </div>
  <div class="px-6 pt-6 pb-8">
    <h3 class="text-sm font-medium text-gray-900">What's included</h3>
    <ul role="list" class="mt-6 space-y-4">
      <%# Loop through items %>
        <li class="flex space-x-3">
            <svg class="h-5 w-5 flex-shrink-0 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
            </svg>
          <span class="text-sm text-gray-500"><%= item %></span>
        </li>
      <% end %>
    </ul>
  </div>
</div>
```

## Pricing Chart (View Controllers)

### Home controller setup

```rb
class HomeController < ApplicationController
  def component
    @pricing_data1 = pricing_data_poro
    @pricing_data1.title = nil # let the component set a default title

    @pricing_data2 = pricing_data_poro(3)
    @pricing_data2.cards[1].highlight = true # highlight the second card

    @pricing_data3 = pricing_data_poro(2)
    @pricing_data3.title = 'Only 2 Plans'
  end

  private

  def pricing_data_poro(take_cards = nil)
    data = pricing_data
    data[:cards] = data[:cards].take(take_cards) if take_cards
    # OpenStruct is not a good practice: But this makes the HASH and feel like a PORO model
    JSON.parse(data.to_json, object_class: OpenStruct)
  end
```

```ruby
  def pricing_data
    {
      title: 'Pricing Plans via Components',
      cards: [
        {
          price: '$12',
          heading: 'Hobby',
          description: 'All the basics for having fun and make a few bucks',
          items: ['Potenti felis, in cras at at ligula nunc.', 'Orci neque eget pellentesque.']
        },
        {
          price: '$24',
          heading: 'Freelancer',
          description: 'All the basics for starting a new business',
          items: ['Potenti felis, in cras at at ligula nunc.', 'Orci neque eget pellentesque.', 'Donec mauris sit in eu tincidunt etiam.']
        },
        {
          price: '$32',
          heading: 'Startup',
          description: 'What you need to starting building an empire',
          items: ['Potenti felis, in cras at at ligula nunc.', 'Orci neque eget pellentesque.', 'Donec mauris sit in eu tincidunt etiam.', 'Faucibus volutpat magna.'] },
        {
          price: '$48',
          heading: 'Enterprise',
          description: 'Scalability and reliablity for your business',
          items: ['Potenti felis, in cras at at ligula nunc.', 'Orci neque eget pellentesque.', 'Donec mauris sit in eu tincidunt etiam.', 'Faucibus volutpat magna.', 'Id sed tellus in varius quisque.', 'Risus egestas faucibus.', 'Risus cursus ullamcorper.']
        }
      ]  
    }
  end
end
```

### Pricing chart using components

```erb
<div class="border-b border-gray-200 py-5">
  <h3 class="text-lg font-medium leading-6 text-gray-900">View component</h3>
  <p class="mt-2 max-w-4xl text-sm text-gray-500">View Components are like partials, but with the added benefit of a class that can control logic and easily tested</p>
</div>

<%= render(PriceChartComponent.new(@pricing_data1)) %>

<%= render(PriceChartComponent.new(@pricing_data2)) %>

<%= render(PriceChartComponent.new(@pricing_data3)) %>
```

### price_card_component.html.erb

```erb
<div class="<%= card_class %>">
  <div class="p-6">
    <h2 class="text-lg font-medium leading-6 text-gray-900"><%= card.heading %></h2>
    <p class="mt-4 text-sm text-gray-500"><%= card.description %></p>
    <p class="mt-8">
      <span class="text-4xl font-bold tracking-tight text-gray-900"><%= card.price %></span>
      <span class="text-base font-medium text-gray-500">/mo</span>
    </p>
    <a href="#" class="mt-8 block w-full rounded-md border border-gray-800 bg-gray-800 py-2 text-center text-sm font-semibold text-white hover:bg-gray-900">Buy Hobby</a>
  </div>
  <div class="px-6 pt-6 pb-8">
    <h3 class="text-sm font-medium text-gray-900">What's included</h3>
    <ul role="list" class="mt-6 space-y-4">
      <% card.items.each do |item| %>
        <li class="<flex space-x-3>">
            <svg class="h-5 w-5 flex-shrink-0 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
            </svg>
          <span class="text-sm text-gray-500"><%= item %></span>
        </li>
      <% end %>
    </ul>
  </div>
</div>
```

### price_card_component.rb

```ruby
class PriceCardComponent < ViewComponent::Base
  attr_reader :card

  def initialize(card)
    @card = card
    super
  end

  def card_class
    highlight = card.highlight == true ? 'border-7 border-red-500' : 'border-gray-200'
    "divide-y divide-gray-200 rounded-lg border border-7 shadow-sm#{highlight}"
  end
end
```

### price_chart_component.html.erb

```erb
<div class="bg-white">
  <div class="mx-auto max-w-7xl py-24 px-4 sm:px-6 lg:px-8">
    <div class="sm:align-center sm:flex sm:flex-col">
      <h1 class="text-5xl font-bold tracking-tight text-gray-900 sm:text-center"><%= @chart.title %></h1>
    </div>
    <div class="<%= card_list_class %>">
      <% @chart.cards.each do |card| %>
        <%= render PriceCardComponent.new(card) %>
      <% end %>
    </div>
  </div>
</div>
```

#### price_chart_component.rb

```ruby
class PriceChartComponent < ViewComponent::Base

  CARDS_TWO = 'mt-12 space-y-4 sm:mt-16 sm:grid sm:grid-cols-1 sm:gap-6 sm:space-y-0 lg:mx-auto lg:max-w-4xl lg:max-w-none lg:grid-cols-2'
  CARDS_ODD = 'mt-12 space-y-4 sm:mt-16 sm:grid sm:grid-cols-1 sm:gap-6 sm:space-y-0 lg:mx-auto lg:max-w-4xl lg:max-w-none lg:grid-cols-3 xl:mx-0 xl:max-w-none xl:grid-cols-3'
  CARDS_EVEN = 'mt-12 space-y-4 sm:mt-16 sm:grid sm:grid-cols-1 sm:gap-6 sm:space-y-0 lg:mx-auto lg:max-w-4xl lg:max-w-none lg:grid-cols-2 xl:mx-0 xl:max-w-none xl:grid-cols-4'

  def initialize(chart)
    @chart = chart

    @chart.title = 'Pricing Plans' if @chart.title.nil?
    super
  end

  def card_list_class
    return CARDS_TWO if @chart.cards.length == 2
    return CARDS_ODD if @chart.cards.length.odd?

    CARDS_EVEN
  end
end
```