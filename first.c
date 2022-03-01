#include <stdio.h>



int main()

{

char c=34;

char *ptr=&c;
// ptr++;

printf("Value of ptr: %u\n",ptr);

ptr++;

printf("Value of ptr: %u\n",ptr);



    return 0;
}

