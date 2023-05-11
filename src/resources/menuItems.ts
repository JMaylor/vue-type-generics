import type { VMenuItemProp } from "@/types/componentTypes";
import { ArchiveBoxIcon, ArrowTopRightOnSquareIcon, DocumentDuplicateIcon, HomeIcon, PencilIcon, QuestionMarkCircleIcon, TrashIcon, UserIcon } from "@heroicons/vue/20/solid";

const menuItems: Array<Array<VMenuItemProp>> = [
  [
    {
      text: 'Edit',
      icon: PencilIcon,
      action: () => console.log('Edit')
    },
    {
      text: 'Duplicate',
      icon: DocumentDuplicateIcon,
      action: () => console.log('Duplicate')
    },
    {
      text: 'Archive',
      icon: ArchiveBoxIcon,
      disabled: true,
      action: () => console.log('Archive')
    },
    {
      text: 'Camera',
      icon: 'fa:camera',
      disabled: true,
      action: () => console.log('Screenshot!')
    },
    {
      text: 'Move',
      icon: ArrowTopRightOnSquareIcon,
      action: () => console.log('Move')
    },
    {
      text: 'Delete',
      icon: TrashIcon,
      action: () => console.log('Delete')
    },
  ],
  [
    {
      text: 'Home',
      icon: HomeIcon,
      to: '/',
    },
    {
      text: 'About',
      icon: QuestionMarkCircleIcon,
      to: '/about',
    },
    {
      text: 'maylor.io',
      icon: UserIcon,
      href: 'https://maylor.io',
      newTab: true
    },
  ]
]

export default menuItems
