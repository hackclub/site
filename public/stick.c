#!/usr/local/bin/tcc -run 
#include <stdio.h>
int main() {
	unsigned y, x;
	for (y=0; y<25; y++) {
		for (x=0; x<25; x++) {
			printf("<input type=\"checkbox\" name=\"c%u_%u\", id=\"%u_%u\">", x, y, x, y);
		}
		puts("<br>");
	}
}
