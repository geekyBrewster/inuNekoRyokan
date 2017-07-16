# Ryokan Inu-Neko: A pet hotel

A while back I attempted a group project to create a check-in / check-out system for a pet hotel. We didn't get the web app complete, as it was our first time using git branching and that slowed down our workflow. But I liked the project, so I'm going to build my own as a side project over the next few weeks, since it'll be good SQL practice.

**Technologies**
- jQuery
- Node.js
- Express
- SQL
- Bootstrap

*Tasks*
  - [ ] Add new owners: first name & last name
  - [ ] Add new pets: info includes name, breed, color & owner (from pull down menu)
  - [ ] Check-in / Check-out pet
   - [ ] Checking in a pet adds today's date to the check-in date
   - [ ] Check out date defaults to 3 days out unless you add different date
  - [ ] Update pet info (only pet's data is editable)
   - [ ] Build Update toggle button to enter editing mode
  - [ ] Delete pet check-in's
  - First page should display:
   - [ ] Add new owners
   - [ ] Add new pets
   - [ ] Summary of pets & check-in/out status
  - Second page should display:
   - [ ]check-in & check-out dates for each pet
   - [ ]pets checked-in but not out should appear at the top of the page
   - [ ] Add Bootstrap styling to the pages
 
 
 *Databases*
  - Table 1: Owners (first name & last name)
  - Table 2: Pets (name, breed, color, owner id, check-in status (default to checked in)
  - Table 3: Visits (check in date, check out date, pet id)
