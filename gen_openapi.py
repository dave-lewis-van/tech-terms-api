import json
import yaml
from main import app

def generate_spec():
    # Fetch the auto-generated schema from FastAPI
    openapi_schema = app.openapi()
    
    # Save as JSON
    with open("openapi.json", "w") as f:
        json.dump(openapi_schema, f, indent=2)
    print("Successfully generated openapi.json")

    # Save as YAML
    with open("openapi.yaml", "w") as f:
        yaml.dump(openapi_schema, f, sort_keys=False)
    print("Successfully generated openapi.yaml")

if __name__ == "__main__":
    generate_spec()