import aocd

def priority(char):
    if char.isupper():
        return ord(char) - 38
    else:
        return ord(char) - 96

def part_1(data):
    output = []
    for row in data:
        first = row[int(len(row) / 2):]
        second = row[:int(len(row) / 2)]
        output.append(priority((set(first)&set(second)).pop()))
 
    return sum(output)


def part_2(data):
    output = []
    for i, j, k in zip(*(iter(data),) * 3):
            output.append(priority((set(i)&set(j)&set(k)).pop()))
    return sum(output)


def main():
    test_data = [
        "vJrwpWtwJgWrhcsFMMfFFhFp",
        "jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL",
        "PmmdzqPrVvPwwTWBwg",
        "wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn",
        "ttgJtRGJQctTZtZT",
        "CrZsJsPPZsGzwwsLwLmpwMDw",
    ]
    data = [x for x in aocd.get_data(day=3, year=2022).splitlines()]
    print(part_1(data))
    print(part_2(data))


if __name__ == "__main__":
    main()
