import json

def generate_markdown_from_json(json_file):
    with open(json_file, 'r', encoding='utf-8') as file:
        data_list = json.load(file)

    sorted_data = sorted(data_list, key=lambda x: x['slug'])

    markdown_output = ''
    for item in sorted_data:
        title = item.get('title', '')
        vis = item.get('vis', '')
        website = item.get('website', '')
        slug = item.get('slug', '')

        markdown_output += f'## {title}\n\n'
        markdown_output += '- **Official Website:** '
        if website:
            markdown_output += f'[{website}]({website})\n'
        else:
            markdown_output += 'Not available\n'
        
        markdown_output += '- **VIS Link:** '
        if vis:
            markdown_output += f'[{vis}]({vis})\n'
        else:
            markdown_output += 'Not available\n'


        svg_link = f'https://www.urongda.com/logos/{slug}'
        markdown_output += '- **SVG logo Link:** '
        markdown_output += f'[{svg_link}]({svg_link})\n'

        markdown_output += '\n'

    return markdown_output

json_file_path = 'data.json'

markdown_content = generate_markdown_from_json(json_file_path)
print(markdown_content)
