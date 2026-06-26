INSERT INTO tag_master (
    ip_address,
    node_id,
    tag_name,
    parameter_id,
    room_id
)
SELECT
    'opc.tcp://192.168.1.232:48010' AS ip_address,
    'ns=2;s=Studio.Tags.Application.' || r.name || '_' || t.suffix AS node_id,
    r.name || '_' || t.suffix AS tag_name,
    t.parameter_id,
    r.id
FROM rooms r
CROSS JOIN (
    VALUES
        ('TE_AVG', 1),
        ('RH', 3)
) AS t(suffix, parameter_id)
WHERE r.id BETWEEN 1 AND 30
ORDER BY r.id;