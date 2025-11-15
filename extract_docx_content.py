#!/usr/bin/env python
# -*- coding: utf-8 -*-
import zipfile
import os
import xml.etree.ElementTree as ET
import re

# 找到所有 .docx 文件
files = [f for f in os.listdir('.') if f.endswith('.docx')]
if not files:
    print("未找到 .docx 文件")
    exit(1)

docx_file = files[0]
print(f"正在读取文件: {docx_file}\n")

try:
    with zipfile.ZipFile(docx_file, 'r') as z:
        document = z.read('word/document.xml')
        root = ET.fromstring(document)
        
        # 定义命名空间
        ns = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
        
        # 提取所有文本内容
        texts = []
        for t in root.iter():
            if t.tag.endswith('}t'):  # 文本节点
                if t.text:
                    texts.append(t.text)
        
        # 合并文本
        content = ''.join(texts)
        
        # 保存到文本文件
        output_file = '文档内容.txt'
        with open(output_file, 'w', encoding='utf-8') as f:
            f.write(content)
        
        print(f"[成功] 文档内容已提取并保存到: {output_file}")
        print(f"\n文档统计:")
        print(f"  - 总字符数: {len(content):,}")
        print(f"  - 总段落数（估算）: {len([t for t in texts if t.strip()])}")
        
        # 显示前几段内容作为预览
        print(f"\n=== 内容预览（前1000字符）===")
        preview = content[:1000].replace('\n', ' ').replace('\r', ' ')
        print(preview)
        print("...")
        
except Exception as e:
    print(f"[错误] 错误: {e}")
    import traceback
    traceback.print_exc()

