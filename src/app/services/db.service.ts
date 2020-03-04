import { UiServiceService } from './ui-service.service';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { v4 as uid } from 'uuid';
import { List, Task, Category, Note } from './../interfaces/interfaces';

@Injectable({
    providedIn: 'root'
})
export class DbService {
    public lists: List[] = [];
    public tasks: Task[] = [];
    public categories: Category[] = [];
    public notes: Note[] = [];
    public loading = true;
    public colors = [ '#FF4444', '#FFBB33', '#00C851', '#33B5E5', '#4B515D', '#3F729B', '#FFCdd2', '#CE93D8' ];
    public icons = [
        'albums',
        'alarm',
        'analytics',
        'aperture',
        'basket',
        'beer',
        'bicycle',
        'book',
        'briefcase',
        'build',
        'cafe',
        'car',
        'cart',
        'cloud-outline',
        'code'
    ];

    constructor(private storage: Storage, private ui: UiServiceService) {
        // this.populateStorage();
        this.getLists().then(async (lists) => {
            if (lists) {
                console.log('obtenemos las listas en el constructor de db mediante una promesa');
                this.lists = [ ...lists ];
                this.loading = false;
            } else {
               // await this.populateStorage();
            }
        });

        this.getCategories().then((categories) => {
            if (categories) {
                console.log('obtenemos las categorias en el constructor de db mediante una promesa');
                this.categories = [ ...categories ];
                this.loading = false;
            }
        });

        this.getNotes().then((notes) => {
            if (notes) {
                console.log('obtenemos las notas en el constructor de db mediante una promesa');
                this.notes = [ ...notes ];
            }
        });
    }

    async populateStorage() {
        const defList: List = {
            id: uid(),
            name: 'My first List',
            note: 'Quick Note 1',
            color: '#33B5E5',
            created_at: new Date(),
            tasks: [
                {
                    id: uid(),
                    name: 'My first Task!',
                    created_at: new Date(),
                    state: false,
                    fav: true
                },
                {
                    id: uid(),
                    name: 'My second Task!',
                    created_at: new Date(),
                    state: false,
                    fav: false
                }
            ],
            archived: false,
            category_id: 'a72bc071-9446-4f71-b07f-e963d27fd29d'
        };
        await this.storage.set('lists', [ defList ]);
        this.lists.push(defList);

        const defCat: Category = {
            id: 'a72bc071-9446-4f71-b07f-e963d27fd29d',
            name: 'Category 1',
            icon: 'albums',
            created_at: new Date()
        };

        await this.storage.set('categories', [ defCat ]);
        this.categories.push(defCat);

        const defNote: Note = {
            id: uid(),
            name: 'I am your first note! Slide me to view my options on the notes list!',
            fav: true,
            created_at: new Date(),
        };
        await this.storage.set('notes', [ defNote ]);
        this.notes.push(defNote);
    }

    /* GET METHODS */
    async getTasksByList(id: string) {
        const searchedList = this.searchListById(id) || {};
        if (searchedList.tasks) {
            this.tasks = searchedList.tasks || null;
            return searchedList;
        }
        return false;
    }
    async getListsByCategory(categoryId: string) {
        let tempLists = [];
        tempLists = this.lists.filter((list) => list.category_id === categoryId);
        return tempLists;
    }

    getCategoryName(id: string) {
        return (id) ? this.categories.find((category) => category.id == id).name : '';
    }

    /* SEARCH METHODS */
    searchListById(id: string): List {
        return this.lists.find((list) => list.id === id);
    }

    searchCategoryById(id: string): Category {
        return this.categories.find((category) => category.id === id);
    }
    searchNoteById(id: string): Note {
        return this.notes.find((note) => note.id === id);
    }
    /* ADD METHODS */

    async addNote(content: string) {
        const newNote = {
            id: uid(),
            name: content,
            fav: false,
            created_at: new Date(),
        };
        this.notes = [ newNote, ...this.notes ];
        await this.saveNotes();
        this.ui.presentSimpleToast('Note succesfully saved!');
    }
    async addList(list: List) {
        const newList = {
            id: uid(),
            name: list.name,
            note: list.note,
            color: list.color,
            created_at: new Date(),
            tasks: [],
            archived: false,
            category_id: list.category_id
        };
        if (newList.category_id === 'nulled') {
            newList.category_id = null;
        }
        this.lists = [ newList, ...this.lists ];

        await this.saveLists();
        this.ui.presentSimpleToast('List succesfully saved!');
    }

    async addCategory(category: Category) {
        const newCategory = {
            id: uid(),
            name: category.name,
            icon: category.icon
        };
        this.categories = [ newCategory, ...this.categories ];

        await this.saveCategories();
    }

    async addTask(listId: string, name: string) {
        const newTask = {
            id: uid(),
            name,
            created_at: new Date(),
            state: false,
            fav: false
        };
        this.tasks = [ newTask, ...this.tasks ];
        const searchedList = this.searchListById(listId);
        searchedList.tasks = [ ...this.tasks ];

        this.lists = this.lists.map((list) => {
            if (list.id === searchedList.id) {
                list = searchedList;
            }
            return list;
        });
        await this.saveTasks();
        this.ui.presentSimpleToast('Task succesfully saved!');
    }
    async saveTasks(listId?: string) {
        if (listId) {
            const searchedList = this.searchListById(listId);
            searchedList.tasks = [ ...this.tasks ];
        }
        await this.saveLists();
    }

    /* EDIT METHODS */
    async editList(list: List) {
        if (list.category_id === 'nulled') {
            list.category_id = null;
        }
        const searchedList = this.searchListById(list.id);
        this.lists = this.lists.map((list) => {
            if (list.id === searchedList.id) {
                list = searchedList;
                return list;
            }
            return list;
        });
        await this.saveLists();
        this.ui.presentSimpleToast('List succesfully edited!');
    }
    async editNote(idNote: string, content: string) {
        const searchedNote = this.notes.find((notex) => notex.id == idNote);
        searchedNote.name = content;
        this.notes = this.notes.map((note) => {
            if (note.id === searchedNote.id) {
                note = searchedNote;
                return note;
            }
            return note;
        });
        await this.saveNotes();
        this.ui.presentSimpleToast('Note succesfully edited!');
    }
    async editCategory(category: Category) {
        let searchedCategory = this.searchCategoryById(category.id);
        searchedCategory = category;

        this.categories = this.categories.map((category) => {
            if (category.id === searchedCategory.id) {
                category = searchedCategory;
                return category;
            }
            return category;
        });
        await this.saveCategories();
        this.ui.presentSimpleToast('Category succesfully edited!');
    }

    async editTask(idList: string, idTask: string, name: string) {
        const searchedList = this.searchListById(idList);

        searchedList.tasks.forEach((task) => {
            if (task.id === idTask) {
                task.name = name;
            }
        });

        this.tasks = [ ...searchedList.tasks ];
        this.lists = this.lists.map((list) => {
            if (list.id === searchedList.id) {
                list = searchedList;
            }
            return list;
        });
        await this.saveLists();
        this.ui.presentSimpleToast('Task succesfully edited!');
    }

    async favTask(idList: string, idTask: string) {
        const searchedList = this.searchListById(idList);

        searchedList.tasks.forEach((task) => {
            if (task.id === idTask) {
                task.fav = !task.fav;
            }
        });

        this.tasks = [ ...searchedList.tasks ];
        this.lists = this.lists.map((list) => {
            if (list.id === searchedList.id) {
                list = searchedList;
            }
            return list;
        });
        await this.saveLists();
        this.ui.presentSimpleToast('Task marked as favorite success!');
    }

    async favNote(id: string) {
        this.notes = this.notes.map((note) => {
            if (note.id === id) {
                note.fav = !note.fav;
            }
            return note;
        });
        await this.saveNotes();
        this.ui.presentSimpleToast('Note marked as favorite success!');
    }

    async archiveList(id: string) {
        const searchedList = this.searchListById(id);
        this.lists = this.lists.map((list) => {
            if (list.id === searchedList.id) {
                if (list.archived == false) {
                    list.archived = true;
                } else {
                    list.archived = false;
                }
                list = searchedList;
                return list;
            }
            return list;
        });
        await this.saveLists();
        this.ui.presentSimpleToast('List succesfully archived!');
    }

    /* DELETE METHODS */
    async delCategory(id: string) {
        this.categories = this.categories.filter((category) => category.id !== id);
        this.lists = this.lists.filter((list) => {
            let finalLists = [];
            if (list.category_id === id) {
                list.category_id = null;
                finalLists.push(list);
            }
            return finalLists;
        });
        await this.saveCategories();
        await this.saveLists();
        this.ui.presentSimpleToast('Category succesfully removed!');
    }

    async delList(id: string) {
        this.lists = this.lists.filter((list) => list.id !== id);
        const searchedList = this.searchListById(id);

        await this.saveLists();
        this.ui.presentSimpleToast('List succesfully removed!');
    }

    async delTask(idList: string, idTask: string) {
        const searchedList = this.searchListById(idList);
        searchedList.tasks = searchedList.tasks.filter((task) => task.id !== idTask);
        this.tasks = [ ...searchedList.tasks ];
        this.lists = this.lists.map((list) => {
            if (list.id === searchedList.id) {
                list = searchedList;
            }
            return list;
        });
        await this.saveLists();
        this.ui.presentSimpleToast('Task succesfully removed!');
    }

    async delNote(id: string) {
        this.notes = this.notes.filter((notex) => notex.id !== id);
        await this.saveNotes();
        this.ui.presentSimpleToast('Note succesfully removed!');
    }

    /* IONIC STORAGE GET AND SET */
    async getLists() {
        return await this.storage.get('lists');
    }

    async saveLists() {
        return await this.storage.set('lists', this.lists);
    }
    async saveNotes() {
        return await this.storage.set('notes', this.notes);
    }

    async saveCategories() {
        return await this.storage.set('categories', this.categories);
    }

    async getCategories() {
        return await this.storage.get('categories');
    }

    async getNotes() {
        return await this.storage.get('notes');
    }
}
