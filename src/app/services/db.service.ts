import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { v4 as uid } from 'uuid';
import * as faker from 'faker';
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

    constructor(private storage: Storage) {
        // this.populateExampleStorage();
        this.getLists().then((lists) => {
            if (lists) {
                console.log('obtenemos las listas en el constructor de db mediante una promesa');
                this.lists = lists;
                this.loading = false;
            }
        });

        this.getCategories().then((categories) => {
            if (categories) {
                console.log('obtenemos las categorias en el constructor de db mediante una promesa');
                this.categories = categories;
                this.loading = false;
            }
        });
    }

    populateExampleStorage() {
        this.storage.set('lists', [
            {
                id: uid(),
                name: faker.name.jobTitle(),
                note: 'quick note 1',
                color: '#33B5E5',
                created_at: new Date(),
                tasks: [
                    {
                        id: uid(),
                        name: faker.name.jobTitle(),
                        created_at: new Date(),
                        state: 0
                    },
                    {
                        id: uid(),
                        name: faker.name.jobTitle(),
                        created_at: new Date(),
                        state: 1
                    }
                ],
                archived: false,
                category_id: '1'
            },
            {
                id: uid(),
                name: faker.name.jobTitle(),
                note: 'quick note 2',
                color: '#DC3545',
                created_at: new Date(),
                tasks: [
                    {
                        id: uid(),
                        name: faker.name.jobTitle(),
                        created_at: new Date(),
                        state: 1
                    }
                ],
                archived: false,
                category_id: '1'
            },
            {
                id: uid(),
                color: '#28A745',
                name: faker.name.jobTitle(),
                created_at: new Date(),
                tasks: [
                    {
                        id: uid(),
                        name: faker.name.jobTitle(),
                        created_at: new Date(),
                        state: 1
                    }
                ],
                archived: false,
                category_id: '2'
            }
        ]);

        this.storage.set('categories', [
            {
                id: '1',
                name: 'Category 1',
                icon: 'code',
                created_at: new Date()
            },
            {
                id: '2',
                icon: 'bicycle',
                name: 'Category 2',
                created_at: new Date()
            },
            {
                id: '3',
                icon: 'car',
                name: 'Category 3',
                created_at: new Date()
            }
        ]);
    }

    async getLists() {
        return await this.storage.get('lists');
    }

    async saveLists() {
        return await this.storage.set('lists', this.lists);
    }
    async saveCategories() {
        return await this.storage.set('categories', this.categories);
    }

    async addList(list: List) {
        if (list.category_id === 'nulled') {
            list.category_id = null;
        }

        const newList = {
            id: uid(),
            name: list.name,
            color: list.color,
            created_at: new Date(),
            tasks: [],
            archived: false,
            category_id: list.category_id
        };

        this.lists = [ newList, ...this.lists ];

        return await this.saveLists();
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
    }
    async getTasksByList(id: string) {
        const searchedList = this.searchListById(id) || {};
        console.log('lista buscada', searchedList);
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

    searchListById(id: string): List {
        return this.lists.find((list) => list.id === id);
    }

    searchCategoryById(id: string): Category {
        return this.categories.find((category) => category.id === id);
    }

    async getCategories() {
        return await this.storage.get('categories');
    }

    async delList(id: string) {
        this.lists = this.lists.filter((list) => list.id !== id);
        await this.saveLists();
    }

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
    }
}
