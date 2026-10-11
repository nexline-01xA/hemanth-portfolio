import argparse
import json
from pathlib import Path

from arthniti.config import DEFAULT_END_YEAR, DEFAULT_HORIZON, DEFAULT_PATHS, DEFAULT_SEED, DEFAULT_START_YEAR
from arthniti.pipeline import run_pipeline


def main() -> None:
    parser = argparse.ArgumentParser(prog="arthniti", description="Simulate and evaluate India's macro indicators.")
    commands = parser.add_subparsers(dest="command", required=True)
    run = commands.add_parser("run", help="Fetch data, evaluate forecasts and simulate")
    run.add_argument("--start-year", type=int, default=DEFAULT_START_YEAR)
    run.add_argument("--end-year", type=int, default=DEFAULT_END_YEAR)
    run.add_argument("--horizon", type=int, default=DEFAULT_HORIZON)
    run.add_argument("--paths", type=int, default=DEFAULT_PATHS)
    run.add_argument("--seed", type=int, default=DEFAULT_SEED)
    run.add_argument("--test-start", type=int, default=2015)
    run.add_argument("--min-train-transitions", type=int, default=10)
    run.add_argument("--output", type=Path, default=Path("outputs"))
    run.add_argument("--cache", type=Path, default=Path("data/cache/world_bank_india.csv"))
    run.add_argument("--offline", action="store_true")
    args = parser.parse_args()
    try:
        result = run_pipeline(output_dir=args.output, cache_path=args.cache, start_year=args.start_year,
            end_year=args.end_year, horizon=args.horizon, n_paths=args.paths, seed=args.seed,
            test_start_year=args.test_start, min_train_transitions=args.min_train_transitions,
            offline=args.offline)
    except Exception as exc:
        parser.exit(2, f"ArthNiti run failed: {exc}\n")
    print(json.dumps(result, indent=2))


if __name__ == "__main__":
    main()
