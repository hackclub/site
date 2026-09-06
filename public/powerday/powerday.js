var f,d,flush_progress=0;last_input=69,id_only=false,show_next=false,msg="",positions=Array(),boxes=Array(),last_states=Array();
if (typeof document.f != "undefined") {
	f = document.f;
	d = document.f.d;
} else {/*I LOVE NETSURF*/
	id_only = true;
	i = document.getElementById("i");
	d = document.getElementById("d");
}
d.value = "";
d.ariaBusy = false;
var dialogues = Array(
	Array("I... am Heid. Can't buy me. Not that I am too against the idea, it's just that it's not possible, I've been told.", 
	"53 years ago or so, there was a sticker that looked a lot like purry fornography, some claimed. Sticker of Orphy. Right there.",
	"*52* years ago there was one with both of us.",
	"You may be attempting to ask where the fuck is Orphy.",
	"Long story. I don't know. Was told that deadlines were way too overdone or something, so it was decided to not bring them in.",
	"\"Should have just used the clock!\", they would have said if they were here...",
	"There was once a soldering iron on sale and Orphy suggested using two as chopsticks to cook food while eating.",
	"Someone tried and got burns with food poisoning. \"And lead poisoning\" - and lead poisoning, yeah.",
	"I'm still coping. See the endless cigar? That's not tobacco.",
	"I'm high as trump tower."),
	Array("The image says \"stickers\" (plural) but it's just a single sticker.",
	"Crazy, I know.",
	"\"I wonder who would buy that\" - see, it's actually random, the one previewed on the image is considered \"elite\", is the only one with this rating, and has a .02% chance to be the one.",
	"I have 4 words for ya! I LOVE *these* stickers, YEAHHHHHHHH!",
	"\"Puts the AD in ADheasive, eh?\" - hah, heh heh... Yeah, the house is winning here.",
	"You have exhausted my dialog on that."),
	Array("Yes, the lottery ticket is the cheapest thing here.",
	"Gotta buy them in bulk, and everything. If you are lucky you will get more chances at the best sticker if you then bulk buy those.",
	"Every day, more powerful gambling! That's our slogan, if only you've read that elsewhere on this page...",
	"\"Double gambling!\", uh huh, literally too. Cuz the stickers, yeah...",
	"Triple gambling!",
	"Dominating!",
	"*DING* *lower voice* Rampage!",
	"Mega gambling!",
	"Unstoppable.",
	"*DONGGGGG* Holy shitttttt."),
	Array("The only thing here actually worth getting an actual box instead of a letter for is this clock of sorts... ...still using a letter.", 
	"\"Looks shiny\", yeah, it sure does... The leaded solder looks yummy, too.",
	"There's no firmware ready to make it actually a real clock. Or a ☢️PowerDay☢️ clock. You could write some...",
	"You will kinda only get this after the event so it is impossible to use as intended, until someone decides to pretend the event never existed and relaunch it of course.",
	"EvilSoda®. EvilSoda®? Don't forget the ice!™",
	"AND we aren't making enough money off of the stickers now bitch! So imma sell clocks now bitch!",
	"Matherfacking clocks, look at this ancient ass clock we got right here.",
	"This mathafaken clock here is *NICE*, you goddamn need to tell the time, and everything.",
	"Good thing we ain't a car dealership yet, I guess...",
	"God motherfucking...")
);
for (i in dialogues) {
	positions.push(-1);
	if (id_only) {
		boxes.push(document.getElementById("i"+i));
	} else {
		boxes.push(eval("f.i"+i));
	}
	boxes[i].checked=false;
	last_states.push(false);
}
function flush() {
	if (msg == d.value) {
		d.ariaBusy = false;
		flush_progress = 0;
		setTimeout(main, 0);
	} else {
		d.value = msg.slice(0, ++flush_progress);
		setTimeout(flush, 24);
	}
}
function main() {
	for (i in boxes) {
		if (boxes[i].checked != last_states[i]) {
			if (i==0) {boxes[i].checked=false;}
			last_states[i]=boxes[i].checked;
			last_input=i;
			show_next=true;
		}
	}
	if (msg != d.value || show_next) {
		positions[last_input] = Math.min(positions[last_input]+1, dialogues[last_input].length-1);
		msg = dialogues[last_input][positions[last_input]];
		d.ariaBusy = true;
		d.value=" ";
		flush();
	} else {
		setTimeout(main, 250);
	}
	show_next = false;
}
setTimeout(main, 1000);
