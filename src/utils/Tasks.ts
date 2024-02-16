import { Tasks } from "../types";

export const tasks: Tasks = {
    '1a781d9a-c4e4-461f-92cd-2b2b7358489e': {
        id: '1a781d9a-c4e4-461f-92cd-2b2b7358489e',
        title: 'Twitter 2.0',
        completed: false,
        directSubtasks: ['6b022e51-8c95-462e-9cc8-3bcd5f386798', 'c265129f-8269-472a-a906-0ce79c5c38ba'],
        uppermostTask: true,
        completedPomodoros: 8,
        timeTaken: 49500000, // 13h45m
        estimatedDuration: 144000000,
        deadline: 'Feb 7'
    },
    '6b022e51-8c95-462e-9cc8-3bcd5f386798': {
        id: '6b022e51-8c95-462e-9cc8-3bcd5f386798',
        title: 'Write comments',
        completed: false,
        directSubtasks: ['27366938-9da0-4ccf-97a6-a68817e5fb84'],
        completedPomodoros: 0,
        timeTaken: 0, // 13h45m
        estimatedDuration: 0
    },
    '27366938-9da0-4ccf-97a6-a68817e5fb84': {
        id: '27366938-9da0-4ccf-97a6-a68817e5fb84',
        title: '...rest',
        completed: false,
        directSubtasks: [],
        completedPomodoros: 0,
        timeTaken: 0, // 13h45m
        estimatedDuration: 0
    },
    'c265129f-8269-472a-a906-0ce79c5c38ba': {
        id: '6b022e51-8c95-462e-9cc8-3bcd5f386798',
        title: 'Advanced',
        description: 'Not required to be done before putting this project on the resume but half of this is quite easy and is good practice for other projects (all the current yellow ones). The other half should be left for later when I finish the Netflix and WhatsApp clone.',
        completed: false,
        directSubtasks: ['51137f0c-f219-4c03-92ef-f10a4425b81b', '13446724-89e3-4010-b772-52fa72f1228a'],
        completedPomodoros: 0,
        timeTaken: 0,
        estimatedDuration: 0
    },
    '51137f0c-f219-4c03-92ef-f10a4425b81b': {
        id: '6b022e51-8c95-462e-9cc8-3bcd5f386798',
        title: 'Add live news to "What\'s Happening Section',
        description: '',
        completed: false,
        directSubtasks: [],
        completedPomodoros: 0,
        timeTaken: 0,
        estimatedDuration: 0
    },
    '13446724-89e3-4010-b772-52fa72f1228a': {
        id: '13446724-89e3-4010-b772-52fa72f1228a',
        title: 'Edit Tweet',
        description: `- Allow the user to edit a tweet they've posted.

        - This will work similarly to GitHub's commit history which shows how a repo progressed. One problem with editing a tweet is that if someone likes a tweet that says 'I Love Puppies' and the author edits their tweet to say 'Heil Hitler', then that person liked a tweet supporting Hitler. To counteract this there are a couple solutions. The first is to only show the version of the tweet the user liked. The second is to show the most recent version but somewhere in the tweet show which one the user originally liked. The history of the tweet would be shown from latest to oldest.`,
        completed: false,
        directSubtasks: [],
        completedPomodoros: 0,
        timeTaken: 0,
        estimatedDuration: 0
    },
    '6e17a455-b984-4845-ac81-5669145bee1e': {
        id: '6e17a455-b984-4845-ac81-5669145bee1e',
        title: 'Get a raise',
        completed: false,
        directSubtasks: ['cad7f903-557e-452e-9904-fd67a8d868d6'],
        uppermostTask: true,
        completedPomodoros: 8,
        timeTaken: 49500000, // 13h45m
        estimatedDuration: 144000000,
        deadline: 'Feb 7'
    },
    'cad7f903-557e-452e-9904-fd67a8d868d6': {
        id: 'cad7f903-557e-452e-9904-fd67a8d868d6',
        title: 'Talk to Mike about $90,000',
        completed: false,
        directSubtasks: [],
        completedPomodoros: 19,
        timeTaken: 11244444, // 13h45m
        estimatedDuration: 11700000,
        deadline: 'Feb 7'
    }
};