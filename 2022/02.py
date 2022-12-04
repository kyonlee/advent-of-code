import aocd


def part_1(data):
    key = {"A": 1, "B": 2, "C": 3, "X": 1, "Y": 2, "Z": 3}
    list = [(key[line[0]], key[line[2]]) for line in data]

    list_score = []

    for x in list:
        score = x[1]
        if x[1] == x[0]:
            list_score.append(score + 3)
        elif x[0] == 1 and x[1] == 3 or x[0] == 2 and x[1] == 1 or x[0] == 3 and x[1] == 2:
            list_score.append(score)
        elif x[0] == 1 and x[1] == 2 or x[0] == 2 and x[1] == 3 or x[0] == 3 and x[1] == 1:
            list_score.append(score + 6)
    return sum(list_score)


def part_2(data):
    key = {"A": 1, "B": 2, "C": 3, "X": 0, "Y": 3, "Z": 6}
    draw = {"A": 1, "B": 2, "C": 3}
    lose = {"A": 3, "B": 1, "C": 2}
    win = {"A": 2, "B": 3, "C": 1}
    list = [(line[0], key[line[2]]) for line in data]

    list_score = []

    for x in list:
        score = x[1]
        if x[1] == 0:
            list_score.append(lose[x[0]] + score)
        elif x[1] == 3:
            list_score.append(draw[x[0]] + score)
        elif x[1] == 6:
            list_score.append(win[x[0]] + score)
    return sum(list_score)


def main():
    data = [x for x in aocd.get_data(day=2, year=2022).splitlines()]
    print(part_1(data))
    print(part_2(data))


if __name__ == "__main__":
    main()
