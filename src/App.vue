<script setup lang="ts">
import { ref } from 'vue'
import VListbox from './components/VListbox.vue'
import { Cog6ToothIcon, ShieldCheckIcon } from '@heroicons/vue/20/solid'
import VCombobox from './components/VCombobox.vue';
import VDisclosure from './components/VDisclosure.vue';
import VRadioGroup from './components/VRadioGroup.vue';
import VMultiListbox from './components/VMultiListbox.vue';
import VMenu from './components/VMenu.vue';

import people from '@resources/people'
import currencies from '@resources/currencies'
import plans from '@resources/plans'
import menuItems from '@resources/menuItems'
import roles from '@resources/roles'
import frequentlyAskedQuestions from '@resources/frequentlyAskedQuestions'

const person = ref<number>()
const currency = ref<string>()
const plan = ref<string>()
const selectedRoles = ref<number[]>([])
</script>

<template>
  <header class="px-6 py-3 border-b border-rose-600 flex justify-between font-medium">
    <RouterView />
    <span class="font-normal">You can use the Menu to navigate between the Home and About page.</span>
  </header>
  <main class="p-4 gap-4 grid grid-cols-12">
    <div class="col-span-12 sm:col-span-6 lg:col-span-4 2xl:col-span-3">
      <VListbox
        v-model="person"
        clearable
        :items="people"
        label="Listbox"
        value-key="id"
        :display-key="o => `${o.id} - ${o.name}`"
      >
        <template #icon="{item}">
          <div
            v-if="'iconBackground' in item"
            class="h-4 w-4 rounded-full"
            :class="item.iconBackground"
          />
          <component
            :is="item.icon"
            v-else
            class="h-5 w-5"
          />
        </template>
      </VListbox>
    </div>
    <div class="col-span-12 sm:col-span-6 lg:col-span-4 2xl:col-span-3">
      <VMultiListbox
        v-model="selectedRoles"
        :items="roles"
        label="Multi Listbox"
        value-key="role_id"
        display-key="role_name"
      >
        <template #icon="{item}">
          <component
            :is="item.icon"
            class="h-5 w-5"
          />
        </template>
      </VMultiListbox>
    </div>
    <div class="col-span-12 sm:col-span-6 lg:col-span-4 2xl:col-span-3">
      <VCombobox
        v-model="currency"
        :items="currencies"
        label="Combobox"
        :value-key="o => `${o.iso_code} - ${o.name}`"
        display-key="name"
      >
        <template #icon="{item}">
          <component
            :is="item.icon"
            class="h-5 w-5"
          />
        </template>
      </VCombobox>
    </div>
    <div class="col-span-12 sm:col-span-6 lg:col-span-4 2xl:col-span-3">
      <VRadioGroup
        v-model="plan"
        :items="plans"
        value-key="name"
        label="Radio Group"
        label-key="name"
        :description-key="o => `${o.ram} / ${o.cpus} / ${o.disk}`"
      >
        <template #itemLabel="{item}">
          <span class="flex">
            <component
              :is="item.icon"
              class="h-5 w-5 mr-4"
            />
            {{ item.name }}
          </span>
        </template>
        <template #itemDescription="{item}">
          <span> {{ item.ram }}/{{ item.cpus }}</span>
          <span aria-hidden="true"> &middot; </span>
          <span>{{ item.disk }}</span>
        </template>
      </VRadioGroup>
    </div>
    <div class="col-span-12 sm:col-span-6 lg:col-span-4 2xl:col-span-3">
      <p class="font-medium px-2">
        Disclosure
      </p>
      <div class="mx-auto w-full max-w-md rounded-lg bg-white p-2 shadow-md space-y-2">
        <VDisclosure
          v-for="faq in frequentlyAskedQuestions"
          :key="faq.question"
          :item="faq"
          title-key="question"
          content-key="answer"
        />
        <VDisclosure>
          <template #title>
            <span>What is your privacy policy?</span><ShieldCheckIcon class="h-5 w-5 mr-auto ml-2" />
          </template>

          <template #default>
            <p class="font-bold mb-2">
              We take your privacy very seriously.
            </p>
            <p>
              We only collect the information necessary to process your order or provide customer support. We do not sell or share your personal information with third parties, except as necessary to fulfill your order or as required by law. For more information, please see our Privacy Policy page.
            </p>
          </template>
        </VDisclosure>
      </div>
    </div>
    <div class="col-span-12 sm:col-span-6 lg:col-span-4 2xl:col-span-3">
      <p class="font-medium px-2">
        Menu
      </p>
      <VMenu
        :items="menuItems"
        title="Menu"
        :icon="Cog6ToothIcon"
      />
    </div>
  </main>
</template>
