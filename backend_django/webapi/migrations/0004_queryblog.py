# Generated by Django 3.1.5 on 2021-04-12 12:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('webapi', '0003_events'),
    ]

    operations = [
        migrations.CreateModel(
            name='QueryBlog',
            fields=[
                ('posted_by', models.CharField(max_length=255)),
                ('title', models.CharField(max_length=100, primary_key=True, serialize=False)),
                ('description', models.TextField(default=None)),
                ('room_type', models.CharField(max_length=20)),
                ('password', models.CharField(default=None, max_length=100)),
                ('posted_on', models.DateTimeField(auto_now_add=True)),
                ('type', models.CharField(default=None, max_length=30)),
            ],
        ),
    ]
