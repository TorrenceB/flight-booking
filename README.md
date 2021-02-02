# Custom Flight Booking Application

- Custom flight booking application built by Torrence A. Brown. Key knowledge demonstrated includes effective use of Semantic HTML, BEM methodology, CSS Flexbox, Ephemeral State Management via React Hooks, interaction with SkyScanner Api utilizing both *Axios* and *Fetch* libraries. Also, introducing my feable attempt at learning animations via CSS! I.e Upon hovering over the "Send it" button take notice of the beautiful transition, how the button evolves from "basic and non-existent" to "illuminous and "Hey, I got all dressed up for you, why don't you notice me?"" More detailed and organized README to come....

### Run on local environment 
- Demos of development and production environment to come soon but in the mean time, it's pretty straight-forward if you've done this before

- Clone Repo: 
```
  git clone https://github.com/TorrenceB/flight-booking.git
```
- Install dependencies: 
```
  npm install
```
- Run project inside local env: 
```
  npm start
```
- Make Pull Request: 
  Any and all *constructive* criticism is much appreciated. I'm still very much a novice and am constantly seeking out ways to improve and learn from the veterans     out there whom possess a passion for what they do... Feedback is incredibly encouraged.  
  
### Takeaways/Stream of Conciousness/Concepts Applied

#### **Debouncing** 
...

#### **Array.prototype.find()**
The find method is a method of iteration on the JavaScript array object. It's purpose is to return a value from the iteration which satisfies conditions    provided by the programmer and if the condition isn't met, ```find()``` returns undefined. Find takes a callback function and an optional ```thisArg``` as arguments. The anonymus callback function takes three arguments but I'm only going to focus on the primary argument for my particular context; this argument is simply the current element of the iteration. This callback get executed once for every element of the array **UNTIL** the callback returns a truthy value, unlike the ```map()``` method which iterates over every element until it reaches the end of the array. Once a truthy is reached, find will return the **VALUE** of that element. 

**What am I attempting to accomplish?**
I used this method in my application in order to get the values attached to the object related to the users entry. This is necessary because I need the ```placeId``` property provided by the SkyScanner API (Not the user entered value) in order to fetch flight details for a specific destination. The typed value is meaningful to the user and the ```placeId``` is meaningful for me in this situation.

**Implementation**
I have two pieces of two that are being managed inside of my Booking component; the first one is an array that represents a list of suggestions based on the values the user types in. I wrapped this call with a debounce function, placing a 2000 ms delay before making the actual call to the SkyScanner API and storing the retrieved "destinations" inside local state with ```setSuggestions()```. I've reduced the data from our API response into a simple object with only the two properties that I need: 
```
     const placesObj = data["Places"].map((d) => ({
        destination: d.PlaceName,
        placeId: d.PlaceId,
      }));
```      
This is now where our second piece of state comes in. The second piece is simply an object that represents the "chosen" suggestion from the list, or we can simply say that it's the final value in the input field when the user has established their chosen destination: 
```
  const [trip, setTrip] = useState({
    destination: "",
    placeId: "",
  });
```
Now I need to set the state of the trip object. But how? I'm able to simply set the ```destination``` property to whatever the user types into the input (```e.target.value```) but I need the ```placeId``` property and not the ```destination```. I begin by declaring a variable ```selectedPlace``` inside my ```onChangeHandler()```. This is where ```find()``` comes in handy. I call ```suggestions.find()``` on my suggestions array and will pass in a single callback function as the argument to ```find()```. To reiterate, ```find()``` returns the value of the element that satisfies the "test" function (our callback) passed into ```find()```. My test is explained as such: if the value of the ```destination``` property matches the input of our user (```e.target.value```) then return true, else continue the iteration until the value matches or an undefined is returned. When true is met, the element which satisfies those conditions is returned by ```find()``` and as a result, I now have access to that entire object. Therefore, from here I'm able to set the new state of my trip by assigning my variable ```selectedPlace.placeId``` to the ```placeId``` of my trip object.    

#### **Error Handling Methods**
...
