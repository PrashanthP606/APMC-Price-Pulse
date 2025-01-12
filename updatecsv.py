import pandas as pd

# Load the CSV file
file_path = 'transformed_data.csv'  # Path to your input file
data = pd.read_csv(file_path)

# Shift the values for day_1 to day_6 and set day_7 to 0
columns_to_shift = ['day_1', 'day_2', 'day_3', 'day_4', 'day_5', 'day_6', 'day_7']
for i in range(len(columns_to_shift) - 1):
    data[columns_to_shift[i]] = data[columns_to_shift[i + 1]]
data['day_7'] = 0

# Save the transformed dataset to a new file
transformed_file_path = 'transformed_data.csv'  # Output file path
data.to_csv(transformed_file_path, index=False)

print(f"Transformed dataset saved to {transformed_file_path}")
