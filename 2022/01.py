import aocd


def part_1(data):
    return max(data)


def part_2(data):
    return sum(sorted(data)[-3:])


def main():
    data = [int(x) if x != '' else 0 for x in aocd.get_data(day=1, year=2022).splitlines()]
    reindeer_calorie = 0
    reindeers = []
    for calorie in data:
        if calorie == 0:
            reindeers.append(reindeer_calorie)
            reindeer_calorie = 0

        reindeer_calorie = calorie + reindeer_calorie
    print(part_1(reindeers))
    print(part_2(reindeers))


if __name__ == "__main__":
    main()
