import { SettingItem } from "../lib/types"

export const SettingsGroup: Array<SettingItem> = [
    {
        icons:{
            leftIcon: {
                name: 'user',
            }
        },
        title: 'Follow and invite friends',
        route: 'Follows'
    },
    {
        icons:{
            leftIcon: {
                name: 'user',
            }
        },
        title: 'Notifications',
        route: 'Notifications'
    },
    {
        icons:{
            leftIcon: {
                name: 'heart',
            }
        },
        title: 'Your Likes',
        route: 'Likes'
    },
    {
        icons:{
            leftIcon: {
                name: 'user',
            }
        },
        title: 'Privacy',
        route: 'Privacy'
    },
    {
        icons:{
            leftIcon: {
                name: 'user',
            }
        },
        title: 'Account',
        route: 'Account'
    },
    {
        icons:{
            leftIcon: {
                name: 'user',
            }
        },
        title: 'Language',
        route: 'Language'
    },
    {
        icons:{
            leftIcon: {
                name: 'user',
            }
        },
        title: 'Help',
        route: 'Help'
    },
    {
        icons:{
            leftIcon: {
                name: 'user',
            }
        },
        title: 'About',
        route: 'About'
    }
]


export const followsGroup: Array<SettingItem> = [
    {
        icons:{
            leftIcon: {
                name: 'instagram',
            }
        },
        title: 'Follow accounts from istagram',
        route: 'Instagram'
    },
    {
        icons:{
            leftIcon: {
                name: 'whatsapp',
            }
        },
        title: 'Invite friends by WhatsApp',
        route: 'WhatsApp'
    },
    {
        icons:{
            leftIcon: {
                name: 'sms',
            }
        },
        title: 'Invite friends by SMS',
        route: 'SMS'
    },
    {
        icons:{
            leftIcon: {
                name: 'envelope',
            }
        },
        title: 'Invite friends by email',
        route: 'Email'
    },
    {
        icons:{
            leftIcon: {
                name: 'upload',
            }
        },
        title: 'Invite friends by...',
        route: 'InviteFriends'
    },
]

export const notificationsGroup: SettingItem[] = [
    {
        icons:{
            rightIcon: {
                name: 'rightangle',
            }
        },
        title: 'Threads and replies',
        route: 'Threads&Replies'
    },
    {
        icons:{
            rightIcon: {
                name: 'right-angle',
            }
        },
        title: 'Following and followers',
        route: 'Follwers'
    },
    {
        icons:{
            rightIcon: {
                name: 'right-angle',
            }
        },
        title: 'From Threads',
        route: 'FromThreads'
    },
];

export const PRIVACY_GROUP: SettingItem[] = [
    {
        icons:{
            rightIcon: {
                name: 'rightangle',
            },
            leftIcon: {
                name: 'mention'
            }
        },
        title: 'Mentions',
        route: 'Menstions'
    },
    {
        icons:{
            rightIcon: {
                name: 'rightangle',
            },
            leftIcon: {
                name: 'user'
            }
        },
        title: 'Muted',
        route: 'Muted'
    },
    {
        icons:{
            rightIcon: {
                name: 'rightangle',
            },
            leftIcon: {
                name: 'mention'
            }
        },
        title: 'Hidden words',
        route: 'Hiddens'
    },
    {
        icons:{
            rightIcon: {
                name: 'rightangle',
            },
            leftIcon: {
                name: 'group'
            }
        },
        title: 'Profiles you follow',
        route: 'Followers'
    },
    {
        icons:{
            rightIcon: {
                name: 'rightangle',
            },
            leftIcon: {
                name: 'mention'
            }
        },
        title: 'Other privacy settings',
        description: `Some settings, like restricting, apply to both Threads and instagram
        and can be managed on instagram`
    },
    {
        icons:{
            rightIcon: {
                name: 'rightangle',
            },
            leftIcon: {
                name: 'mention'
            }
        },
        title: 'Blocks',
        route: '',
    },
    {
        icons:{
            rightIcon: {
                name: 'rightangle',
            },
            leftIcon: {
                name: 'heart'
            }
        },
        title: 'Hide likes',
        route: ''
    },
]

export const ACCOUNT_GROUP: SettingItem[] = [
    {
        icons:{
            rightIcon: {
                name: 'rightangle',
            }
        },
        title: 'Take a break',
        route: 'Break'
    },
    {
        icons:{
            rightIcon: {
                name: 'rightangle',
            },
        },
        title: 'Deactivate profile',
        route: 'DeactiveProfile'
    },
    {
        icons:{
            rightIcon: {
                name: 'rightangle',
            },
        },
        title: 'Media quality',
        route: 'Media'
    },
    {
        icons:{
            rightIcon: {
                name: 'rightangle',
            }
        },
        title: 'Other account settings',
        description: `Some settings, like restricting, apply to both Threads and instagram
        and can be managed on instagram`
    },
    {
        icons:{
            rightIcon: {
                name: 'rightangle',
            }
        },
        title: 'Personal information',
        route: ''
    },
    {
        icons:{
            rightIcon: {
                name: 'rightangle',
            },
        },
        title: 'Supervison',
        route: '',
    },
    {
        icons:{
            rightIcon: {
                name: 'rightangle',
            },
        },
        title: 'Security',
        route: ''
    },
    {
        icons:{
            rightIcon: {
                name: 'rightangle',
            },
        },
        title: 'Account status',
        route: ''
    },
    {
        icons:{
            rightIcon: {
                name: 'rightangle',
            },
        },
        title: 'Download your information',
        route: ''
    },
    {
        icons:{
            rightIcon: {
                name: 'rightangle',
            },
        },
        title: 'Transfer your information',
        route: ''
    },

]

export const HELP_GROUP: SettingItem[] = [
    {
        icons:{
            rightIcon: {
                name: 'rightangle',
            }
        },
        title: 'Report a problem',
        route: 'Problem'
    },
    {
        icons:{
            rightIcon: {
                name: 'rightangle',
            },
        },
        title: 'Help Center',
        route: 'Help'
    },
    {
        icons:{
            rightIcon: {
                name: 'rightangle',
            },
        },
        title: 'Privacy and security help',
        route: 'Privacy&Security'
    },
    {
        icons:{
            rightIcon: {
                name: 'rightangle',
            }
        },
        title: 'Support requests',
    },
]

export const ABOUT_GROUP: SettingItem[] = [
    {
        icons:{
            rightIcon: {
                name: 'rightangle',
            }
        },
        title: 'Privacy Policy',
        route: 'PrivacyPolicy'
    },
    {
        icons:{
            rightIcon: {
                name: 'rightangle',
            },
        },
        title: 'Terms of User',
        route: 'Terms'
    },
    {
        icons:{
            rightIcon: {
                name: 'rightangle',
            },
        },
        title: 'Third Party Notice',
        route: 'Notice'
    },
]

export const ACTIVITY_GROUP = [
    "All",
    "Follows",
    "Replies",
    'Mentions',
    'Quotes',
    'Reposts',
    'Verified'
] 