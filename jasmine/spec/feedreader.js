/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* makes sure that the allFeeds variable has been 
         * defined and that it is not empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* loops through each feed in the allFeeds object 
         * and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it("have URLs defined, and the URLs are not empty", function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined(); 
                expect(feed.url.length).not.toBe(0); 
            }); 
        }); 

        /* loops through each feed in the allFeeds object
         * and ensures it has a name defined
         * and that the name is not empty.
         */
        it("have names defined, and the names are not empty", function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0); 
            });
        });
    });


    describe("The menu", function() {
        /* ensures the menu element is hidden by default. */
        it("is hidden by default", function() {
            const body = document.querySelector("body"); 
            expect(body.classList.contains("menu-hidden")).toBe(true); 
        }); 

         /* ensures the menu changes visibility when the menu icon is clicked. 
          * This test have two expectations: the menu displays when
          * clicked and it hide when clicked again.
          */
        it("displays when clicked and hides when clicked again", function() {
            const body = document.querySelector("body"); 
            const menuIcon = document.querySelector(".menu-icon-link"); 

            menuIcon.click(); 
            expect(body.classList.contains("menu-hidden")).toBe(false);

            menuIcon.click(); 
            expect(body.classList.contains("menu-hidden")).toBe(true);
        }); 
    }); 


    describe("Initial Entries", function() {
        /* ensures when the loadFeed function is called and completes its work, 
         * there is at least a single .entry element within the .feed container.
         * loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        it("are loaded", function() {
            const feed = document.querySelector(".feed"); 
            expect(feed.children.length > 0).toBe(true); 
        });
    });
    

    describe("New Feed Selection", function() {
        /* ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
        const feed = document.querySelector(".feed");     
        const firstFeed = [];    
        const secondFeed = []; 

        beforeEach(function(done) {
            loadFeed(0);
            for (var i=0; i<feed.children.length; i++) {
                firstFeed.push(feed.children[i].innerText);
            }
            // console.log(firstFeed);
            loadFeed(1, done); 
        });

        it("actually changes content", function() {
            for (var i=0; i<feed.children.length; i++) {
                secondFeed.push(feed.children[i].innerText);
                // console.log(secondFeed[i] === firstFeed[i]);
            }
            // console.log(secondFeed);
            // check if the two feeds are different
            expect(secondFeed).not.toEqual(firstFeed);
        })
    }); 
}());
