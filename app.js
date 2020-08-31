// storage Controller
const StorageCtrl = (function() {
        // public Methods
        return {
            storeItem: function() {
                let items;
                // check if any item is in local storage
                if (localStorage.getItem('items') === null) {
                    items = [];
                    // push new item
                    items.push(item);
                    //Set local storage
                    localStorage.setItem('items', JSON.stringify(items));
                } else {
                    // Get what is already in local storage
                    items = JSON.parse(localStorage.getItem('items'));
                    // push new items to local storage
                    items.push(item);
                    // reset local storage after item push
                    localStorage.setItem('items', JSON.stringify(items));
                }
            },
            getItemsFromStorage: function() {
                let items;
                if (localStorage.getItem('items') === null) {
                    items = [];
                } else {
                    items = JSON.parse(localStorage.getItem('items'));
                }
                return items;
            },
            updateItemStorage: function(updatedItem) {
                let items = JSON.parse(localStorage.getItems('items'));

                items.forEach(function(item, index) {
                    if (updatedItem.id === item.id) {
                        items.splice(index, 1, updatedItem);
                    }
                });
                localStorage.setItem('items', JSON.stringify(items));
            },

            deleteItemFromStorage: function(id) {
                let items = JSON.parse(localStorage.getItems('items'));

                items.forEach(function(item, index) {
                    if (id === item.id) {
                        items.splice(index, 1);
                    }
                });
                localStorage.setItem('items', JSON.stringify(items));
            },
            clearItemsFromStorage: function() {
                localStorage.removeItem('items');
            }
        }
    })(),


    //Item Controller
    const ItemCtrl = (function() {
        // Item Constructor
        const Item = function(id, name, calories) {
                this.id = id;
                this.name = name;
                this.calories = calories;
            }
            // Data structures
        const data = {
                //items: [],
                items: StorageCtrl.getItemsFromStorage(),
                currentItem: null,
                totalCalories: 0
            }
            // public methods
        return {
            getItems: function() {
                return data.items;
            },
            addItem: function(name, calories) {
                let ID;
                //create I.D
                if (data.items.lenght > 0) {
                    ID = data.items[data.items.lenght - 1].id + 1;
                } else {
                    ID = 0
                }
                // CALORIES to Number
                calories = parseInt(calories);
                // Create a new Item
                newItem = new Item(ID, name, calories);
                //ADD to Items Array
                data.itemAs.push(newItem);
                // return the New item
                return newItem;
            },

            getItemById: function(id) {
                let found = null;
                //Loop through iterm
                data.items.forEach(function(item) {
                    if (item.id === id) {
                        found = item;
                    }
                });
                return found;
            },
            updateItem: function(name, calories) {
                // calories to number
                calories = parseInt(calories);

                let found = null;
                data.items.forEach(function(item) {
                    if (item.id === data.currentItem.id) {
                        item.name = name;
                        item.calories = calories;
                        found = item;
                    }
                });
                return found;
            },
            deleteItem: function(id) {
                // Get ids
                const ids = data.items.map(function(item) {
                    return item.id;
                });
                // Get index
                const index = ids.indexOf(id);
                // remove item
                data.items.splice(index, 1);
            },
            clearAllItems: function() {
                data.items = [];
            },
            setCurrentItem: function(item) {
                data.currentItem = item;
            },
            getCurrentItem: function() {
                return data.currentItem;
            },
            getTotalCalories: function() {
                let total = 0;
                //Loop through itemms and add cals
                data.items.forEach(function(item) {
                    total += item.calories;
                });
                // Set total cal in data structures
                data.totalCalories = total;

                // Return total
                return data.totalCalories;

            },
            logData: function() {
                return data;
            }
        }
    })();


//UI Controller

const UICtrl = (function() {
    const UISelectors = {
            itemList: '#item-list',
            listItems: '#item-list li',
            addBtn: '.add-btn',
            updateBtn: '.update-btn',
            deleteBtn: '.delete-btn',
            backBtn: '.back-btn',
            clearBtn: '.clear-btn',
            itemNameInput: '#item-list',
            itemCaloriesInput: '#item-calories',
            totalCalories: '.total-calories'
        }
        //public methods
    return {
        populateItemList: function(items) {
            let html = '';

            items.forEach(function(item) {
                html += `<li class="collection-item" id="item-${item.id}">
                <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
                <a href="#" class="secondary-content">
                    <i class="edit-item fa fa-pencil"></i>
                </a>
            </li>`

            });

            // insert list items
            document.querySelector(UISelectors.itemList).innerHTML = html;
        },
        getItemInput: function() {
            return {
                name: document.querySelector(UISelectors.itemNameInput).value,
                calories: document.querySelector(UISelectors.itemCaloriesInput).value
            }
        },
        addListItem: function(item) {
            //Show the list
            document.querySelector(UISelectors.itemList).style.display = 'block';
            // create Li Element
            const li = document.createElement('li');
            //Add class
            li.className = 'collection-item';
            // Add ID
            li.id = `item-${item.id}`;
            //Add html
            li.innerHTML = `<strong>${item.name}: </strong> <em>${item.calories} Calories</em>
            <a href="#" class="secondary-content">
                <i class="edit-item fa fa-pencil"></i>
            </a>`;
            // Insert Item
            document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li)
        },
        updateListItem: function(item) {
            let listItems = document.querySelectorAll(UISelectors.listItems);
            // Turn Node list into array
            listItems = array.from(listItems);
            listItems.forEach(function(listItems) {
                const itemID = listItem.getAttribute('id');
                if (itemID === `item-${item.id}`) {
                    document.querySelector(`#${itemID}`).innerHTML =
                        `<strong>${item.name}: </strong> <em>${item.calories} Calories</em>
                    <a href="#" class="secondary-content">
                    <i class="edit-item fa fa-pencil"></i>
                 </a>`;
                }
            });
        },
        deleteListItem: function(id) {
            const itemID = `#item-${id}`;
            const item = document.querySelector(itemID);
            item.remove();
        },
        clearInput: function() {
            document.querySelector(UISelectors.itemNameInput).value = '';
            document.querySelector(UISelectors.itemCaloriesInput).value = '';
        },

        addItemToForm: function() {
            document.querySelector(UISelectors.itemNameInput).value = ItemCtrl.getCurrentItem().name;
            document.querySelector(UISelectors.itemCaloriesInput).value = ItemCtrl.getCurrentItem().calories;
            UICtrl.showEditState();
        },
        removeItems: function() {
            let listItems = document.querySelectorAll(UISelectors.listItems);
            // Turn Nodelist into an Array
            listItems = Array.from(listItems);

            listItems.forEach(function(item) {
                item.remove();
            })
        },
        hideList: function() {
            document.querySelector(UISelectors.itemList).style.display = 'none';
        },
        showTotalCalories: function(totalCalories) {
            document.querySelector(UISelectors.totalCalories).textContent = totalCalories;
        },
        clearEditState: function() {
            UIctrl.clearInput();
            document.querySelector(UISelectors.updateBtn).style.display = 'none';
            document.querySelector(UISelectors.deleteBtn).style.display = 'none';
            document.querySelector(UISelectors.backBtn).style.display = 'none';
            document.querySelector(UISelectors.addBtn).style.display = 'inline';
        },

        showEditState: function() {
            document.querySelector(UISelectors.updateBtn).style.display = 'inline';
            document.querySelector(UISelectors.deleteBtn).style.display = 'inline';
            document.querySelector(UISelectors.backBtn).style.display = 'inline';
            document.querySelector(UISelectors.addBtn).style.display = 'none';
        },

        getSelectors: function() {
            return UISelectors;
        }
    }
})();


//App Controller
const App = (function(ItemCtrl, StorageCtrl, UICtrl) {
    // Load event listeners
    const loadEventListeners = function() {
        //Get UI selectors
        const UISelectors = UICtrl.getSelectors();

        //Add item event Listeners
        document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);

        // Disable Submit on enter
        document.addEventListener('keypress', function(e) {
            if (e.keyCode === 13 || e.which === 13) {
                e.preventDefault();
                return false;
            }
        });
        // edit Icon click Event
        document.querySelector(UISelectors.itemList).addEventListener('click', itemEditClick);

        // update item event
        document.querySelector(UISelectors.updateBtn).addEventListener('click', itemUpdateSubmit);

        // Delete item event
        document.querySelector(UISelectors.deleteBtn).addEventListener('click', itemDeleteSubmit);

        // back  button event
        document.querySelector(UISelectors.backBtn).addEventListener('click', UICtrl.clearEditState);

        // Clear items event
        document.querySelector(UISelectors.clearBtn).addEventListener('click', clearAllItemsClick);


    }

    // Add item  Submit
    const itemAddSubmit = function(e) {
        // get form input from UI Controller
        const input = UICtrl.getItemInput();
        // check for name and calorie input
        if (input.name !== '' && input.calories !== '') {
            // Add item 
            const newItem = ItemCtrl.addItem(input.name, input.calories);
            //Add item to UI list
            UICtrl.addListItem(newItem);

            // Get total calories
            const totalCalories = ItemCtrl.getTotalCalories();
            // Add total cal to the UI
            UICtrl.showTotalCalories(totalCalories);

            //Store in local storage
            StorageCtrl.storeItem(newItem);

            // clear input field
            UICtrl.clearInput();
        }

        e.preventDefault();
    }

    // Click edit item
    const itemEditClick = function(e) {
            if (e.target.classList.contains('edit-item')) {
                // Get list item id
                const listId = e.target.parentNode.parentNode.id;
                // BREAK INTO THE ARRAY BY SPLITTING
                const listIdArr = listId.split('-');
                // Get the actual id
                const id = parseInt(listIdArr[1]);
                // get item id
                const itemToEdit = itemCtrl.getItemById(id);
                // set current item
                ItemCtrl.setCurrentItem(itemToEdit);

                // Add item to form
                UICtrl.addItemToForm();
            }
            e.preventDefault
        }
        // Create Item update submit function
    const itemUpdateSubmit = function(e) {
            // Get item input
            const input = UICtrl.getItemInput();
            //update item
            const updateItem = itemCtrl.updateItem(input.name, input.calories);

            // Update UI
            UICtrl.updateListItem(updatedItem);

            // Get total calories
            const totalCalories = ItemCtrl.getTotalCalories();
            // Add total calories to the UI
            UICtrl.showTotalCalories(totalCalories);

            // Update local storage
            StorageCtrl.updateItemStorage(updatedItem);

            UICtrl.clearEditState();

            e.preventDefault();
        },

        // Delete button event
        const itemDeleteSubmit = function(e) {
            // Get current item
            const currentItem = itemCtrl.getCurrentItem();

            // Delete from data structure
            ItemCtrl.deleteItem(currentItem.id);

            // Delete from UI
            UICtrl.deleteListItem(currentItem.id);

            // Get total calories
            const totalCalories = ItemCtrl.getTotalCalories();
            // Add total cal to the UI
            UICtrl.showTotalCalories(totalCalories);

            //Delete from local storage
            StorageCtrl.deleteItemFromStorage(currentItem.id);

            UICtrl.clearEditState();

            e.preventDefault();
        }

    // clear items event
    const clearAllItemsClick = function() {
        // Delete all items from data structures
        ItemCtrl.clearAllItems();

        // Get total calories
        const totalCalories = ItemCtrl.getTotalCalories();
        // Add total cal to the UI
        UICtrl.showTotalCalories(totalCalories);

        // Remove from UI
        UICtrl.removeItems();

        //Clear from local storage
        StorageCtrl.clearItemsFromStorage();

        //Hide from UI
        UICtrl.hideList();
    }


    //public methods
    return {
        init: function() {
            // Set initial state
            UICtrl.clearEditState();
            // fetch items from data structure or Api
            const items = ItemCtrl.getItems();
            // Check if any items 
            if (items.lenght = 0) {
                UICtrl.hideList();
            } else {
                // populate list with Items 
                UICtrl.populateItemList(items);
            }

            // Get total calories
            const totalCalories = ItemCtrl.getTotalCalories();
            // Add total cal to the UI
            UICtrl.showTotalCalories(totalCalories);


            //Load event Listeners
            loadEventListeners();
        }
    }
})(ItemCtrl, StorageCtrl, UICtrl);
// Initailize App
App.init();