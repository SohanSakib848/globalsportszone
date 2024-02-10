#include <stdio.h>
#include <stdlib.h>
#include <time.h>

// Constants
#define NUM_PROCESSES 1
#define PROCESS_PAGES 16
#define MEMORY_SIZE 8

typedef struct {
    int process_id;
    int page_id;
    int reference_counter;
} Page;

typedef struct {
    Page* memory[MEMORY_SIZE];
    int counters[MEMORY_SIZE];
} NFURAM;

NFURAM* initialize_nfu_ram() {
    NFURAM* nfu_ram = (NFURAM*)malloc(sizeof(NFURAM));
    if (nfu_ram == NULL) {
        perror("Error in malloc");
        exit(EXIT_FAILURE);
    }

    for (int i = 0; i < MEMORY_SIZE; i++) {
        nfu_ram->memory[i] = NULL;
        nfu_ram->counters[i] = 0;
    }
    return nfu_ram;
}

void access_page(NFURAM* nfu_ram, int process_id, int page_id, int reference_bit) {
    if (page_id < 0 || page_id >= PROCESS_PAGES) {
        printf("Invalid page access for process %d: Page %d\n", process_id, page_id);
        return;
    }

    int frame_index = -1;

    for (int i = 0; i < MEMORY_SIZE; i++) {
        if (nfu_ram->memory[i] != NULL && nfu_ram->memory[i]->page_id == page_id) {
            frame_index = i;
            break;
        }
    }

    if (frame_index != -1) {
        nfu_ram->counters[frame_index] += reference_bit;
    } else {
        int least_used_index = find_least_used_page(nfu_ram);
        replace_page(nfu_ram, least_used_index, process_id, page_id);
    }
}

int find_least_used_page(NFURAM* nfu_ram) {
    int min_index = 0;
    for (int i = 1; i < MEMORY_SIZE; i++) {
        if (nfu_ram->counters[i] < nfu_ram->counters[min_index]) {
            min_index = i;
        }
    }
    return min_index;
}

void replace_page(NFURAM* nfu_ram, int index, int process_id, int page_id) {
    printf("Replacing Page %d for Process %d with Page %d\n",
           nfu_ram->memory[index]->page_id, process_id, page_id);

    free(nfu_ram->memory[index]);
    nfu_ram->memory[index] = (Page*)malloc(sizeof(Page));
    if (nfu_ram->memory[index] == NULL) {
        perror("Error in malloc");
        exit(EXIT_FAILURE);
    }

    nfu_ram->memory[index]->process_id = process_id;  // Corrected line
    nfu_ram->memory[index]->page_id = page_id;
    nfu_ram->memory[index]->reference_counter = 1;
    nfu_ram->counters[index] = 0;
}

void print_memory_state(NFURAM* nfu_ram) {
    printf("Memory: ");
    for (int i = 0; i < MEMORY_SIZE; i++) {
        if (nfu_ram->memory[i] != NULL) {
            printf("P%d:%d (%d) ", nfu_ram->memory[i]->process_id, 
                   nfu_ram->memory[i]->page_id, nfu_ram->counters[i]);
        } else {
            printf("Empty ");
        }
    }
    printf("\n");
}

void free_nfu_ram(NFURAM* nfu_ram) {
    for (int i = 0; i < MEMORY_SIZE; i++) {
        free(nfu_ram->memory[i]);
    }
    free(nfu_ram);
}

int main() {
    srand((unsigned int)time(NULL));

    NFURAM* nfu_ram = initialize_nfu_ram();

    // Simulate an infinite loop of page accesses
    while (1) {
        int process_id = 0;  // Only one process
        int page_id = rand() % PROCESS_PAGES;
        int reference_bit = rand() % 2;  // 0 or 1

        access_page(nfu_ram, process_id, page_id, reference_bit);
        print_memory_state(nfu_ram);
    }

    // This part is unreachable in an infinite loop,
    // but you can include cleanup code if needed.
    free_nfu_ram(nfu_ram);

    return 0;
}
